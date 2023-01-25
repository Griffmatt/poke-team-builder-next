import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const usersRouter = createTRPCRouter({
    getSuggestedUsers: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany()
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
                },
            })
        }),
})
