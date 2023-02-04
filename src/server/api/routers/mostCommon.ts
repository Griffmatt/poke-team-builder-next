import { z } from "zod"
import { countStringArr } from "server/utils/countStringArr"
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

            const teamIds = pokemonWithTeams.reduce((a, b) => {
                const moves = b.teams.map((team) => team.teamId)
                return [...a, ...moves]
            }, [] as string[])

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
    moves: publicProcedure
        .input(z.object({ pokemonName: z.string() }))
        .query(async ({ ctx, input }) => {
            const pokemonData = await ctx.prisma.createdPokemon.findMany({
                where: {
                    name: input.pokemonName,
                },
                include: {
                    moves: {
                        select: {
                            move: true,
                        },
                    },
                },
            })

            const movesArr = pokemonData.reduce((a, b) => {
                const moves = b.moves.map((move) => move.move)
                return [...a, ...moves]
            }, [] as string[])

            const { string: moves, total } = countStringArr(movesArr)

            return { moves, total }
        }),
})
