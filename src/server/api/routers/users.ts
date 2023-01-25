import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const usersRouter = createTRPCRouter({
    getSuggestedUsers: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany()
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return 'you can now see this secret message!'
    }),
})
