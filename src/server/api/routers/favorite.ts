import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

import { z } from "zod"
import { pokemonInclude, teamsInclude } from "server/utils/includeConfigs"
import { formatTeams } from "server/utils/formatTeams"

export const favoriteRouter = createTRPCRouter({
    checkUserFavoritePokemon: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            const favorites = await ctx.prisma.favoritePokemon.findMany({
                where: {
                    userId: input.userId,
                },
            })
            const formatFavorites = favorites.map((favorite) => {
                return favorite.pokemonId
            })
            return formatFavorites
        }),
    getUserFavoritePokemon: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.favoritePokemon.findMany({
                where: {
                    userId: input.userId,
                },
                include: {
                    createdPokemon: {
                        ...pokemonInclude,
                    },
                },
            })
        }),
    favoritePokemon: protectedProcedure
        .input(z.object({ userId: z.string(), pokemonId: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.favoritePokemon.create({
                data: {
                    pokemonId: input.pokemonId,
                    userId: input.userId,
                },
            })
        }),
    unfavoritePokemon: protectedProcedure
        .input(z.object({ userId: z.string(), pokemonId: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.favoritePokemon.delete({
                where: {
                    pokemonId_userId: {
                        pokemonId: input.pokemonId,
                        userId: input.userId,
                    },
                },
            })
        }),
    checkUserFavoriteTeams: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            const favorites = await ctx.prisma.favoriteTeams.findMany({
                where: {
                    userId: input.userId,
                },
            })
            const formatFavorites = favorites.map((favorite) => {
                return favorite.teamId
            })
            return formatFavorites
        }),
    getUserFavoriteTeams: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            const teamsArr = await ctx.prisma.favoriteTeams.findMany({
                where: {
                    userId: input.userId,
                },
                include: {
                    team: {
                        ...teamsInclude,
                    },
                },
            })

            const teams = teamsArr.map((team) => {
                return team.team
            })

            return formatTeams(teams)
        }),
    favoriteTeam: protectedProcedure
        .input(z.object({ userId: z.string(), teamId: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.favoriteTeams.create({
                data: { teamId: input.teamId, userId: input.userId },
            })
        }),
    unfavoriteTeam: protectedProcedure
        .input(z.object({ userId: z.string(), teamId: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.favoriteTeams.delete({
                where: {
                    teamId_userId: {
                        teamId: input.teamId,
                        userId: input.userId,
                    },
                },
            })
        }),
})
