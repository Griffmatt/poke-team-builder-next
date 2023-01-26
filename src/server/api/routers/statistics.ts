import { createTRPCRouter, publicProcedure } from '../trpc'

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
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 12)
        return { totalPokemon, topPokemon }
    }),
})
