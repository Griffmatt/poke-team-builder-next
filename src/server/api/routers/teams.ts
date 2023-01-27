import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const teamsRouter = createTRPCRouter({
    getTeams: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.team.findMany({
            include: {
                pokemon: {
                    select: {
                        createdPokemon: true,
                    },
                },
            },
        })
    }),
    getUserTeams: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.team.findMany({
                where: {
                    userId: input.userId,
                },
                include: {
                    pokemon: {
                        select: {
                            createdPokemon: true,
                        },
                    },
                },
            })
        }),
    getTeam: publicProcedure
        .input(
            z.object({
                teamId: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.team.findUnique({
                where: {
                    id: input.teamId,
                },
                include: {
                    pokemon: {
                        select: {
                            createdPokemon: true,
                        },
                    },
                },
            })
        }),
    buildTeam: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                teamStyle: z.string(),
                teamName: z.string(),
                pokemon: z.object({
                    createMany: z.object({
                        data: z.array(
                            z.object({
                                pokemonId: z.string(),
                            })
                        ),
                    }),
                }),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.team.create({
                data: input,
            })
        }),
    deleteTeam: protectedProcedure
        .input(
            z.object({
                teamId: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.team.delete({
                where: {
                    id: input.teamId,
                },
            })
        }),
})
