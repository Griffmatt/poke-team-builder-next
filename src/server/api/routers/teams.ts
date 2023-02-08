import { sortByFavorited } from "utils/sortByFavorited"
import { z } from "zod"
import { formatTeams } from "../../utils/formatTeams"
import { teamsInclude, userTeamArr } from "../../utils/includeConfigs"
import { buildTeamInput } from "../../utils/inputs"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const teamsRouter = createTRPCRouter({
    getTeams: publicProcedure.query(async ({ ctx }) => {
        const teams = await ctx.prisma.team.findMany({
            ...teamsInclude,
        })

        const formatResults = formatTeams(teams)

        return formatResults
    }),
    getUserTeams: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const teams = await ctx.prisma.team.findMany({
                where: {
                    userId: input.userId,
                },
                ...teamsInclude,
            })

            const sortByFavorite = sortByFavorited<userTeamArr>(teams)

            const formattedTeams = formatTeams(sortByFavorite)

            return formattedTeams
        }),
    getTeam: publicProcedure
        .input(
            z.object({
                teamId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const teams = await ctx.prisma.team.findUnique({
                where: {
                    id: input.teamId,
                },
                ...teamsInclude,
            })
            if (teams === null) return null

            const formattedTeams = formatTeams([teams])

            return formattedTeams[0]
        }),
    buildTeam: protectedProcedure
        .input(buildTeamInput)
        .mutation(({ ctx, input }) => {
            const userId = ctx.session.user.id
            return ctx.prisma.team.create({
                data: {
                    ...input,
                    userId,
                    pokemon: { createMany: { data: input.pokemon } },
                },
            })
        }),
    deleteTeam: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            const userId = ctx.session.user.id
            return ctx.prisma.team.delete({
                where: {
                    userId_id: {
                        userId,
                        id: input.id,
                    },
                },
            })
        }),
    addBattle: protectedProcedure
        .input(
            z.object({
                teamId: z.string(),
                won: z.boolean(),
            })
        )
        .mutation(({ ctx, input }) => {
            const increment = input.won ? 1 : 0
            return ctx.prisma.team.update({
                where: {
                    id: input.teamId,
                },
                data: {
                    wins: {
                        increment: increment,
                    },
                    battles: {
                        increment: 1,
                    },
                },
            })
        }),
    recentTeams: publicProcedure.query(async ({ ctx }) => {
        const teams = await ctx.prisma.team.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
            ...teamsInclude,
        })

        return formatTeams(teams)
    }),
})
