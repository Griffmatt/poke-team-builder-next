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
        const topPokemon = pokemonCounted
            .sort((a, b) => {
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
        const results = await ctx.prisma.createdPokemon.findMany({
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
        results.sort((a, b) => {
            return b.favorited.length - a.favorited.length
        })

        return results
    }),
})
