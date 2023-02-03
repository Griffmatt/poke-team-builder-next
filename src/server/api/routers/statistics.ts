import { countStringArr } from "../../utils/countStringArr"
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

        return pokemon.slice(0, 12)
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
})
