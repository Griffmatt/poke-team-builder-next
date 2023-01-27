import { z } from "zod"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc"

export const pokemonRouter = createTRPCRouter({
    getAllPokemon: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.createdPokemon.findMany({
            include: {
                moves: true,
                evs: true,
                ivs: true,
                teams: true,
            },
        })
    }),
    getSinglePokemon: publicProcedure
        .input(z.object({ pokemonId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.createdPokemon.findUnique({
                where: { id: input.pokemonId },
                include: {
                    moves: {
                        orderBy: {
                            moveOrder: "asc",
                        },
                    },
                    evs: true,
                    ivs: true,
                    teams: true,
                },
            })
        }),
    getUsersPokemon: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.createdPokemon.findMany({
                where: { userId: input.userId },
                include: {
                    moves: {
                        orderBy: {
                            moveOrder: "asc",
                        },
                    },
                    evs: true,
                    ivs: true,
                    teams: true,
                },
            })
        }),
    buildPokemon: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                name: z.string(),
                ability: z.string(),
                nature: z.string(),
                heldItem: z.string(),
                shiny: z.boolean(),
                moves: z.object({
                    createMany: z.object({
                        data: z.array(
                            z.object({
                                move: z.string(),
                                moveOrder: z.number(),
                            })
                        ),
                    }),
                }),
                evs: z.object({
                    createMany: z.object({
                        data: z.array(
                            z.object({
                                stat: z.string(),
                                value: z.number(),
                            })
                        ),
                    }),
                }),
                ivs: z.object({
                    createMany: z.object({
                        data: z.array(
                            z.object({
                                stat: z.string(),
                                value: z.number(),
                            })
                        ),
                    }),
                }),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.createdPokemon.create({
                data: input,
                include: { moves: true, ivs: true, evs: true },
            })
        }),
    updatePokemon: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                ability: z.string(),
                nature: z.string(),
                heldItem: z.string(),
                moves: z.array(
                    z.object({
                        move: z.string(),
                        moveOrder: z.number(),
                    })
                ),
                evs: z.array(
                    z.object({
                        stat: z.string(),
                        value: z.number(),
                    })
                ),
                ivs: z.array(
                    z.object({
                        stat: z.string(),
                        value: z.number(),
                    })
                ),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const pokemonId = input.id
            const pokemonData = {
                ability: input.ability,
                nature: input.nature,
                heldItem: input.heldItem,
            }

            const results = await Promise.all([
                ctx.prisma.createdPokemon.update({
                    where: { id: pokemonId },
                    data: pokemonData,
                }),
                ...input.moves.map((move) => {
                    return ctx.prisma.pokemonMoves.update({
                        where: {
                            moveOrder_pokemonId: {
                                moveOrder: move.moveOrder,
                                pokemonId: pokemonId,
                            },
                        },
                        data: move,
                    })
                }),
                ...input.evs.map((ev) => {
                    return ctx.prisma.pokemonEvs.update({
                        where: {
                            stat_pokemonId: {
                                stat: ev.stat,
                                pokemonId: pokemonId,
                            },
                        },
                        data: ev,
                    })
                }),
                ...input.ivs.map((iv) => {
                    return ctx.prisma.pokemonIvs.update({
                        where: {
                            stat_pokemonId: {
                                stat: iv.stat,
                                pokemonId: pokemonId,
                            },
                        },
                        data: iv,
                    })
                }),
            ])

            return results
        }),
})
