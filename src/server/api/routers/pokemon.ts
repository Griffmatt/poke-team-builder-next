import { z } from "zod"
import { sortByFavorited } from "../../../utils/sortByFavorited"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc"

export const pokemonRouter = createTRPCRouter({
    getAllPokemon: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.createdPokemon.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                moves: {
                    select: {
                        move: true,
                        moveOrder: true,
                    },
                    orderBy: {
                        moveOrder: "asc",
                    },
                },
                evs: {
                    select: {
                        stat: true,
                        value: true,
                    },
                    orderBy: {
                        stat: "desc",
                    },
                },
                ivs: {
                    select: {
                        stat: true,
                        value: true,
                    },
                    orderBy: {
                        stat: "desc",
                    },
                },
                teams: true,
            },
        })
    }),
    getSinglePokemon: publicProcedure
        .input(
            z.object({ pokemonId: z.string(), userId: z.string().nullish() })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.createdPokemon.findUnique({
                where: { id: input.pokemonId },
                include: {
                    moves: {
                        select: {
                            move: true,
                            moveOrder: true,
                        },
                        orderBy: {
                            moveOrder: "asc",
                        },
                    },
                    evs: {
                        select: {
                            stat: true,
                            value: true,
                        },
                        orderBy: {
                            stat: "asc",
                        },
                    },
                    ivs: {
                        select: {
                            stat: true,
                            value: true,
                        },
                        orderBy: {
                            stat: "asc",
                        },
                    },
                    teams: true,
                },
            })
        }),
    getUsersPokemon: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            const results = await ctx.prisma.createdPokemon.findMany({
                where: {
                    userId: input.userId,
                },
                include: {
                    moves: {
                        select: {
                            move: true,
                            moveOrder: true,
                        },
                        orderBy: {
                            moveOrder: "asc",
                        },
                    },
                    evs: {
                        select: {
                            stat: true,
                            value: true,
                        },
                        orderBy: {
                            stat: "desc",
                        },
                    },
                    ivs: {
                        select: {
                            stat: true,
                            value: true,
                        },
                        orderBy: {
                            stat: "desc",
                        },
                    },
                    teams: true,
                    favorited: {
                        where: {
                            userId: input.userId,
                        },
                        select: {
                            userId: true,
                            favoritedAt: true
                        },
                    },
                },
            })

            const sortedPokemon = sortByFavorited(results)
            return sortedPokemon
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
        .mutation(({ ctx, input }) => {
            return ctx.prisma.createdPokemon.create({
                data: {
                    ...input,
                    moves: { createMany: { data: input.moves } },
                    evs: { createMany: { data: input.evs } },
                    ivs: { createMany: { data: input.ivs } },
                },
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
    deletePokemon: protectedProcedure
        .input(
            z.object({
                pokemonId: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.createdPokemon.delete({
                where: {
                    id: input.pokemonId,
                },
            })
        }),
})
