import { Prisma } from "@prisma/client"

const teamsInclude = Prisma.validator<Prisma.TeamArgs>()({
    include: {
        favorited: {
            select: {
                userId: true,
                favoritedAt: true,
            },
        },
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

const pokemonInclude = Prisma.validator<Prisma.CreatedPokemonArgs>()({
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
})

const CreatedPokemon = Prisma.validator<Prisma.CreatedPokemonArgs>()({
    ...pokemonInclude,
})

const CreatedTeam = Prisma.validator<Prisma.TeamArgs>()({
    ...teamsInclude,
})

type userPokemonArr = Prisma.CreatedPokemonGetPayload<typeof CreatedPokemon>[]
type userTeamArr = Prisma.TeamGetPayload<typeof CreatedTeam>[]

type teams = Prisma.TeamGetPayload<typeof teamsInclude>[]

export {
    type teams,
    teamsInclude,
    pokemonInclude,
    type userPokemonArr,
    type userTeamArr,
}
