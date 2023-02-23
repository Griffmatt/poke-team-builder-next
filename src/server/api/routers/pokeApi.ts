import { createTRPCRouter, publicProcedure } from "../trpc"

import { z } from "zod"

import { PokemonClient, ItemClient, BerryClient } from "pokenode-ts"

const api = new PokemonClient()
const itemApi = new ItemClient()
const berryApi = new BerryClient()

export const pokeApiRouter = createTRPCRouter({
    getPokemon: publicProcedure.query(() => {
        return api.listPokemons(0, 1008)
    }),
    getPokemonByName: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input }) => {
            const pokemon = await api.getPokemonByName(input.name)

            const pokemonData = {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types,
                stats: pokemon.stats,
                sprites: pokemon.sprites,
                abilities: pokemon.abilities,
                moves: pokemon.moves,
            }

            return pokemonData
        }),
    getHeldItems: publicProcedure.query(async () => {
        const itemsData = await itemApi.getItemCategoryByName("held-items")
        const berryData = await berryApi.listBerries()
        const items = itemsData.items.map((item) => item.name).sort()
        const berries = berryData.results
            .map((berry) => `${berry.name} berry`)
            .sort()
        return [...items, ...berries]
    }),
})
