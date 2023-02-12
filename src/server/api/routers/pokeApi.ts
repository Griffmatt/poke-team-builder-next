import { createTRPCRouter, publicProcedure } from "../trpc"

import { z } from "zod"

import { PokemonClient, ItemClient, BerryClient } from "pokenode-ts"

const api = new PokemonClient()
const itemApi = new ItemClient()
const berryApi = new BerryClient()

export const pokeApiRouter = createTRPCRouter({
    getPokemon: publicProcedure
        .input(z.object({ limit: z.number() }))
        .query(({ input }) => {
            return api.listPokemons(0, input.limit)
        }),
    getPokemonByName: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(({ input }) => {
            return api.getPokemonByName(input.name)
        }),
    getHeldItems: publicProcedure.query(async () => {
        const itemsData = await itemApi.getItemCategoryByName("held-items")
        const berryData = await berryApi.listBerries()
        const items = itemsData.items.map((item) => {
            return { name: item.name }
        })
        const berries = berryData.results.map((berry) => {
            return {
                name: `${berry.name} berry`,
            }
        })
        return [...items, ...berries]
    }),
})
