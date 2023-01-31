import { formatTeams } from "../../utils/formatTeams"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const statisticsRouter = createTRPCRouter({
    getTopPokemon: publicProcedure.query(async ({ ctx }) => {
        const pokemonArr = await ctx.prisma.createdPokemon.findMany({})
        const pokemonMap = new Map<string, number>()
        let pokemonCounted = [] as { name: string; amount: number }[]
        pokemonArr?.forEach((pokemon) => {
            const pokemonValue = pokemonMap.get(pokemon.name)
            pokemonMap.set(pokemon.name, (pokemonValue ?? 0) + 1)
        })

        pokemonMap.forEach((value, key) => {
            pokemonCounted = [...pokemonCounted, { name: key, amount: value }]
        })

        const totalPokemon = pokemonCounted.reduce((a, b) => a + b.amount, 0)
        const topPokemon = pokemonCounted.sort((a, b) => {
            if (b.amount === a.amount) {
                const sortName = [a.name, b.name].sort()
                if (sortName[0] === b.name) return 1
                return -1
            }
            return b.amount - a.amount
        })
        return { totalPokemon, topPokemon }
    }),
    getPopularPokemon: publicProcedure.query(async ({ ctx }) => {
        const pokemon = await ctx.prisma.createdPokemon.findMany({
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
                    select: {
                        userId: true,
                        favoritedAt: true,
                    },
                },
            },
        })
        pokemon.sort((a, b) => {
            return b.favorited.length - a.favorited.length
        })

        return pokemon.slice(0, 12)
    }),
    getPopularTeams: publicProcedure.query(async ({ ctx }) => {
        const teams = await ctx.prisma.team.findMany({
            include: {
                favorited: {
                    select: {
                        userId: true,
                        favoritedAt: true,
                    },
                },
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
                                teams: true,
                                favorited: {
                                    select: {
                                        userId: true,
                                        favoritedAt: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        teams.sort((a, b) => {
            return b.favorited.length - a.favorited.length
        })

        const teamsFormatted = formatTeams(teams)

        return teamsFormatted.slice(0, 12)
    }),
})
