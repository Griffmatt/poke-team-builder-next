import { z } from "zod"
import { countStringArr } from "../../utils/countStringArr"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const mostCommonRouter = createTRPCRouter({
    teamMates: publicProcedure
        .input(z.object({ pokemonName: z.string() }))
        .query(async ({ ctx, input }) => {
            const pokemonWithTeams = await ctx.prisma.createdPokemon.findMany({
                where: {
                    name: input.pokemonName,
                },
                include: {
                    teams: {
                        select: {
                            teamId: true,
                        },
                    },
                },
            })

            const teamIds = pokemonWithTeams.map((pokemon) => {
                return pokemon.teams.map((team) => team.teamId)
            })[0]

            const pokemonOnTeams = await ctx.prisma.pokemonOnTeam.findMany({
                where: {
                    NOT: {
                        createdPokemon: {
                            name: input.pokemonName,
                        },
                    },
                    teamId: {
                        in: teamIds,
                    },
                },
                include: {
                    createdPokemon: true,
                },
            })

            const pokemonNames = pokemonOnTeams.map(
                (pokemon) => pokemon.createdPokemon.name
            )
            const { string: pokemon, total } = countStringArr(pokemonNames)

            return { pokemon, total, pokemonName: input.pokemonName }
        }),
    heldItems: publicProcedure
        .input(z.object({ pokemonName: z.string() }))
        .query(async ({ ctx, input }) => {
            const pokemonData = await ctx.prisma.createdPokemon.findMany({
                where: {
                    name: input.pokemonName,
                },
            })

            const heldItemsArr = pokemonData.map((pokemon) => pokemon.heldItem)

            const { string: heldItems, total } = countStringArr(heldItemsArr)

            return { heldItems, total}
        }),
})
