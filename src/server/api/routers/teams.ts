import { z } from "zod"
import { formatTeams } from "../../utils/formatTeams"
import { teamsInclude } from "../../utils/includeConfigs"
import { buildTeamInput } from "../../utils/inputs"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const teamsRouter = createTRPCRouter({
    getTeams: publicProcedure.query(async ({ ctx }) => {
        const results = await ctx.prisma.team.findMany({
            ...teamsInclude,
        })

        const formatResults = formatTeams(results)

        return formatResults
    }),
    getUserTeams: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const results = await ctx.prisma.team.findMany({
                where: {
                    userId: input.userId,
                },
                ...teamsInclude,
            })

            const formatResults = formatTeams(results)

            return formatResults
        }),
    getTeam: publicProcedure
        .input(
            z.object({
                teamId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const results = await ctx.prisma.team.findUnique({
                where: {
                    id: input.teamId,
                },
                ...teamsInclude,
            })
            if (results === null) return null

            const formatResults = formatTeams([results])

            return formatResults[0]
        }),
    buildTeam: protectedProcedure
        .input(buildTeamInput)
        .mutation(({ ctx, input }) => {
            return ctx.prisma.team.create({
                data: {
                    ...input,
                    pokemon: { createMany: { data: input.pokemon } },
                },
            })
        }),
    deleteTeam: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.team.delete({
                where: {
                    id: input.id,
                },
            })
        }),
    addBattle: protectedProcedure.input(z.object({
        teamId: z.string(),
        won: z.boolean()
    })).query(({ ctx, input}) => {
        const increment = input.won ? 1 : 0
        return prisma?.team.update({
            where: {
                id: input.teamId
            },
            data: {
                wins: {
                    increment: increment
                },
                battles: {
                    increment: 1
                }
            }
        })
    })

    
})
