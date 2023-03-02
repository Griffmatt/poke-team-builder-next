import { z } from "zod"
import { countStringArr } from "../../../utils/countStringArr"
import { formatTeams } from "../../utils/formatTeams"
import { pokemonInclude, teamsInclude } from "../../utils/includeConfigs"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const statisticsRouter = createTRPCRouter({
    getTopPokemon: publicProcedure.query(async ({ ctx }) => {
        const pokemonArr = await ctx.prisma.createdPokemon.findMany({})
        const pokemonNameArr = pokemonArr.map((pokemon) => pokemon.name)
        const { string: pokemon, total } = countStringArr(pokemonNameArr)

        return { pokemon, total }
    }),
    getPopularPokemon: publicProcedure.query(async ({ ctx }) => {
        const pokemon = await ctx.prisma.createdPokemon.findMany({
            ...pokemonInclude,
        })
        pokemon.sort((a, b) => {
            return b.favorited.length - a.favorited.length
        })

        return pokemon.slice(0, 30)
    }),
    getPopularTeams: publicProcedure.query(async ({ ctx }) => {
        const teams = await ctx.prisma.team.findMany({
            ...teamsInclude,
        })
        teams.sort((a, b) => {
            return b.favorited.length - a.favorited.length
        })

        const teamsFormatted = formatTeams(teams)

        return teamsFormatted.slice(0, 5)
    }),
    getUserStats: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            const teams = await ctx.prisma.team.findMany({
                where: {
                    userId: input.userId,
                },
            })
            const pokemons = await ctx.prisma.createdPokemon.findMany({
                where: {
                    userId: input.userId,
                },
                ...pokemonInclude,
            })

            const totalTeams = teams.length ?? 0
            const totalPokemon = pokemons.length ?? 0
            const wins = teams.reduce((total, team) => {
                return total + team.wins
            }, 0)
            const favoriteTeam = teams.reduce((topTeam, team) => {
                if (team.battles > topTeam.battles) return team
                return topTeam
            }, teams[0])
            const pokemonNames = pokemons.map((pokemon) => pokemon.name)

            const pokemonCounted = countStringArr(pokemonNames)
            const favoritePokemon = pokemonCounted.string[0].name
            return {
                wins,
                totalPokemon,
                totalTeams,
                favoriteTeam,
                favoritePokemon,
            }
        }),
})
