import { z } from 'zod'
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
    postPokemon: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                name: z.string(),
                ability: z.string(),
                nature: z.string(),
                heldItem: z.string(),
                moves: z.object({
                    createMany: z.object({
                        data: z.array(
                            z.object({
                                move: z.string(),
                                moveOrder: z.number(),
                            })
                        ),
                    }),
                }),
                stats: z.object({
                    createMany: z.object({
                        data: z.array(
                            z.object({
                                stat: z.string(),
                                value: z.number(),
                            })
                        ),
                    }),
                }),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.createdPokemon.create({
                data: input,
                include: { stats: true, moves: true },
            })
        }),
})
