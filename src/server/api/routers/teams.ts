import { z } from "zod"
import { formatTeams } from "../../utils/formatTeams"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const teamsRouter = createTRPCRouter({
    getTeams: publicProcedure.query(async ({ ctx }) => {
        const results = await ctx.prisma.team.findMany({
            include: {
                pokemon: {
                    select: {
                        createdPokemon: {
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
                                teams: true
                            },
                        },
                    },
                },
            },
        })

        const formatResults = formatTeams(results)

        return formatResults
    }),
    getUserTeams: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const results = await ctx.prisma.team.findMany({
                where: {
                    userId: input.userId,
                },
                include: {
                    pokemon: {
                        select: {
                            createdPokemon: {
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
                                    teams: true
                                },
                            },
                        },
                    },
                },
            })

            const formatResults = formatTeams(results)

            return formatResults
        }),
    getTeam: publicProcedure
        .input(
            z.object({
                teamId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const results = await ctx.prisma.team.findUnique({
                where: {
                    id: input.teamId,
                },
                include: {
                    pokemon: {
                        select: {
                            createdPokemon: {
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
                            },
                        },
                    },
                },
            })
            if (results === null) return null

            const formatResults = formatTeams([results])

            return formatResults[0]
        }),
    buildTeam: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                teamStyle: z.string(),
                teamName: z.string(),
                originalTrainerId: z.string().nullish(),
                pokemon: z.object({
                    createMany: z.object({
                        data: z.array(
                            z.object({
                                pokemonId: z.string(),
                            })
                        ),
                    }),
                }),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.team.create({
                data: input,
            })
        }),
    deleteTeam: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.team.delete({
                where: {
                    id: input.id,
                },
            })
        }),
})
