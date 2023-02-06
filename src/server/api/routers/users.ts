import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const usersRouter = createTRPCRouter({
    getSuggestedUsers: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            take: 10,
            select: {
                name: true,
                image: true,
                userName: true,
                id: true,
            },
        })
    }),

    getUser: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.user.findUnique({
                where: {
                    id: input.userId,
                },
                select: {
                    name: true,
                    image: true,
                    userName: true,
                    id: true,
                },
            })
        }),

    getUserWithQuery: publicProcedure
        .input(z.object({ query: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.user.findMany({
                where: {
                    name: {
                        startsWith: input.query,
                    },
                },
                select: {
                    name: true,
                    image: true,
                    userName: true,
                    id: true,
                },
            })
        }),
})
