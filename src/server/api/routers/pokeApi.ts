import { createTRPCRouter, publicProcedure } from "../trpc"

import { z } from "zod"

import { PokemonClient, ItemClient, BerryClient, type Type } from "pokenode-ts"
import { getTypeDamage } from "server/utils/getTypeDamage"

const pokemonApi = new PokemonClient()
const itemApi = new ItemClient()
const berryApi = new BerryClient()

export const pokeApiRouter = createTRPCRouter({
    getPokemon: publicProcedure.query(() => {
        return pokemonApi.listPokemons(0, 1008)
    }),
    getPokemonByName: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input }) => {
            const pokemon = await pokemonApi.getPokemonByName(input.name)

            const firstType = await pokemonApi.getTypeByName(
                pokemon.types[0].type.name
            )
            const typeDamageArr = [firstType.damage_relations]

            let secondType: Type
            if (pokemon.types[1]?.type.name) {
                secondType = await pokemonApi.getTypeByName(
                    pokemon.types[1].type.name
                )
                typeDamageArr.push(secondType.damage_relations)
            }

            const typeDamage = getTypeDamage(typeDamageArr)

            const pokemonData = {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types,
                stats: pokemon.stats,
                sprites: pokemon.sprites,
                abilities: pokemon.abilities,
                moves: pokemon.moves,
                typeDamage: typeDamage,
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
