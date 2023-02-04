import { createTRPCRouter, publicProcedure } from "../trpc"

import { z } from "zod"

import { PokemonClient, ItemClient } from "pokenode-ts"

const api = new PokemonClient()
const itemApi = new ItemClient()

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
    getHeldItems: publicProcedure.query(() => {
        return itemApi.listItems()
    }),
})
