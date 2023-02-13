import { z } from "zod"
import { countStringArr } from "server/utils/countStringArr"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const mostCommonRouter = createTRPCRouter({
    teamMates: publicProcedure
        .input(z.object({ pokemonName: z.string() }))
        .query(async ({ ctx, input }) => {
            const pokemonWithTeams = await ctx.prisma.createdPokemon.findMany({
                where: {
                    name: input.pokemonName,
                },
                include: {
                    teams: {
                        select: {
                            teamId: true,
                        },
                    },
                },
            })

            const teamIds = pokemonWithTeams.reduce((a, b) => {
                const moves = b.teams.map((team) => team.teamId)
                return [...a, ...moves]
            }, [] as string[])

            const pokemonOnTeams = await ctx.prisma.pokemonOnTeam.findMany({
                where: {
                    NOT: {
                        createdPokemon: {
                            name: input.pokemonName,
                        },
                    },
                    teamId: {
                        in: teamIds,
                    },
                },
                include: {
                    createdPokemon: true,
                },
            })

            const pokemonNames = pokemonOnTeams.map(
                (pokemon) => pokemon.createdPokemon.name
            )
            const { string: pokemon, total } = countStringArr(pokemonNames)

            return { pokemon, total, pokemonName: input.pokemonName }
        }),
    moves: publicProcedure
        .input(z.object({ pokemonName: z.string() }))
        .query(async ({ ctx, input }) => {
            const pokemonData = await ctx.prisma.createdPokemon.findMany({
                where: {
                    name: input.pokemonName,
                },
                include: {
                    moves: {
                        select: {
                            move: true,
                        },
                    },
                },
            })

            const movesArr = pokemonData.reduce((a, b) => {
                const moves = b.moves.map((move) => move.move)
                return [...a, ...moves]
            }, [] as string[])

            const { string: moves, total } = countStringArr(movesArr)

            return { moves, total }
        }),
    stats: publicProcedure
        .input(z.object({ pokemonName: z.string() }))
        .query(async ({ ctx, input }) => {
            const pokemonEvs = await ctx.prisma.createdPokemon.findMany({
                where: {
                    name: input.pokemonName,
                },
                include: {
                    evs: {
                        orderBy: {
                            stat: "asc",
                        },
                        select: {
                            stat: true,
                            value: true,
                        },
                    },
                },
            })

            const formatStats = pokemonEvs.map((pokemon) => {
                return pokemon.evs.map((stat) => {
                    return stat.value
                })
            })

            const statsReduced = formatStats.map((statArr) => {
                return statArr.join(" ")
            })

            const statsMap = new Map<string, number>()

            statsReduced.forEach((stat) => {
                const statExists = statsMap.get(stat)
                statsMap.set(stat, (statExists ?? 0) + 1)
            })

            let statsCounted: { stats: string; amount: number }[] = []

            statsMap.forEach((value, key) => {
                statsCounted = [...statsCounted, { stats: key, amount: value }]
            })

            const commonStats = statsCounted
                .sort((a, z) => {
                    return z.amount - a.amount
                })
                .slice(0, 4)

            const formatCommonStats = commonStats.map((stat) => {
                const stats = stat.stats.split(" ")
                return [
                    {
                        stat: "HP",
                        value: Number(stats[2])
                    },
                    {
                        stat: "Att",
                        value: Number(stats[0])
                    },
                    {
                        stat: "Def",
                        value: Number(stats[1])
                    },
                    {
                        stat: "SpA",
                        value: Number(stats[3])
                    },
                    {
                        stat: "SpD",
                        value: Number(stats[4])
                    },
                    {
                        stat: "Spe",
                        value: Number(stats[5])
                    },
                ]
            })

            return formatCommonStats
        }),
})
