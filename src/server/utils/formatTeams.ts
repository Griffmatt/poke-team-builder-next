import { Prisma } from "@prisma/client"

const teams = Prisma.validator<Prisma.TeamArgs>()({
    include: {
        pokemon: {
            select: {
                createdPokemon: {
                    include: {
                        moves: {
                            select: {
                                move: true,
                                moveOrder: true,
                            },
                        },
                        evs: {
                            select: {
                                stat: true,
                                value: true,
                            },
                        },
                        ivs: {
                            select: {
                                stat: true,
                                value: true,
                            },
                        },
                        teams: true,
                        favorited: {
                            select: {
                                userId: true,
                                favoritedAt: true,
                            },
                        },
                    },
                },
            },
        },
    },
})

type teamsArr = Prisma.TeamGetPayload<typeof teams>[]

export const formatTeams = (results: teamsArr) =>
    results.map((team) => {
        return {
            id: team.id,
            userId: team.userId,
            originalTrainerId: team.originalTrainerId,
            teamStyle: team.teamStyle,
            teamName: team.teamName,
            createdAt: team.createdAt,
            pokemon: team.pokemon.map(({ createdPokemon }) => {
                return {
                    id: createdPokemon.id,
                    userId: createdPokemon.userId,
                    name: createdPokemon.name,
                    ability: createdPokemon.ability,
                    nature: createdPokemon.nature,
                    heldItem: createdPokemon.heldItem,
                    teraType: createdPokemon.teraType,
                    shiny: createdPokemon.shiny,
                    createdAt: createdPokemon.createdAt,
                    moves: createdPokemon.moves,
                    evs: createdPokemon.evs,
                    ivs: createdPokemon.ivs,
                    teams: createdPokemon.teams,
                    favorited: createdPokemon.favorited,
                }
            }),
        }
    })
