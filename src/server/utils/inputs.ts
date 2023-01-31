import { z } from "zod";

const stats = ["HP", "Att", "Def", "SpD", "SpA", "Spe"] as [string, ...string[]]

const buildPokemonInput = z.object({
    userId: z.string(),
    name: z.string(),
    ability: z.string(),
    nature: z.string(),
    heldItem: z.string(),
    shiny: z.boolean(),
    teraType: z.string(),
    moves: z.array(
        z.object({
            move: z.string(),
            moveOrder: z.number(),
        })
    ),
    evs: z.array(
        z.object({
            stat: z.enum(stats),
            value: z.number(),
        })
    ),
    ivs: z.array(
        z.object({
            stat: z.enum(stats),
            value: z.number(),
        })
    ),
})

const updatePokemonInput = z.object({
    id: z.string(),
    ability: z.string(),
    nature: z.string(),
    heldItem: z.string(),
    teraType: z.string(),
    moves: z.array(
        z.object({
            move: z.string(),
            moveOrder: z.number(),
        })
    ),
    evs: z.array(
        z.object({
            stat: z.enum(stats),
            value: z.number(),
        })
    ),
    ivs: z.array(
        z.object({
            stat: z.enum(stats),
            value: z.number(),
        })
    ),
})

const buildTeamInput = z.object({
    userId: z.string(),
    teamStyle: z.string(),
    teamName: z.string().min(1).max(16),
    originalTrainerId: z.string().nullish(),
    pokemon: z.array(
        z.object({
            pokemonId: z.string(),
        })
    ),
})

export { buildPokemonInput, updatePokemonInput, buildTeamInput }