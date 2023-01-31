import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

import { z } from "zod"

export const favoriteRouter = createTRPCRouter({
    getUserFavoritePokemon: publicProcedure
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
    favoritePokemon: protectedProcedure
        .input(z.object({ userId: z.string(), pokemonId: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.favoritePokemon.create({
                data: { pokemonId: input.pokemonId, userId: input.userId },
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
        getUserFavoriteTeams: publicProcedure
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
