import { z } from "zod"
import { countPokemon } from "../../utils/countPokemon"
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

            const mapPokemon = pokemonOnTeams.map(
                (pokemon) => pokemon.createdPokemon
            )
            const count = countPokemon(mapPokemon)

            return {...count, pokemonName: input.pokemonName}
        }),
})
