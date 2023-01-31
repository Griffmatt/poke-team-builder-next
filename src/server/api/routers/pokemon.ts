import { z } from "zod"
import { sortByFavorited } from "../../../utils/sortByFavorited"
import { pokemonInclude } from "../../utils/includeConfigs"
import { buildPokemonInput, updatePokemonInput } from "../../utils/inputs"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc"

export const pokemonRouter = createTRPCRouter({
    getAllPokemon: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.createdPokemon.findMany({
            orderBy: {
                createdAt: "desc",
            },
            ...pokemonInclude,
        })
    }),
    getSinglePokemon: publicProcedure
        .input(
            z.object({ pokemonId: z.string(), userId: z.string().nullish() })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.createdPokemon.findUnique({
                where: { id: input.pokemonId },
                ...pokemonInclude,
            })
        }),
    getUsersPokemon: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            const results = await ctx.prisma.createdPokemon.findMany({
                where: {
                    userId: input.userId,
                },
                ...pokemonInclude,
            })

            const sortedPokemon = sortByFavorited(results)
            return sortedPokemon
        }),
    buildPokemon: protectedProcedure
        .input(buildPokemonInput)
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
        .input(updatePokemonInput)
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
                pokemonTeams: z.array(z.string()),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await Promise.all([
                ctx.prisma.createdPokemon.delete({
                    where: {
                        id: input.pokemonId,
                    },
                }),
                ...input.pokemonTeams.map((teamId) => {
                    return ctx.prisma.team.delete({
                        where: {
                            id: teamId,
                        },
                    })
                }),
            ])
        }),
})
