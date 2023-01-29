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
    checkFavorite: publicProcedure
        .input(z.object({ userId: z.string(), pokemonId: z.string() }))
        .query(async ({ ctx, input }) => {
            const favorite = await ctx.prisma.favoritePokemon.findUnique({
                where: {
                    pokemonId_userId: {
                        userId: input.userId,
                        pokemonId: input.pokemonId,
                    },
                },
            })
            return favorite !== null
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
})
