import { CreatedPokemon } from "@prisma/client";





export const countPokemon = (pokemonArr: CreatedPokemon[]) => {
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
        const pokemon = pokemonCounted.sort((a, b) => {
            if (b.amount === a.amount) {
                const sortName = [a.name, b.name].sort()
                if (sortName[0] === b.name) return 1
                return -1
            }
            return b.amount - a.amount
        })

        return { pokemon, totalPokemon}
}