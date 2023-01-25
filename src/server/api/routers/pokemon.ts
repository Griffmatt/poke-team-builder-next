import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const pokemonRouter = createTRPCRouter({
    getAllPokemon: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.createdPokemon.findMany({
            include: {
                moves: true,
                stats: true,
                teams: true,
            },
        })
    }),
    postPokemon: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.createdPokemon
    }),
})
