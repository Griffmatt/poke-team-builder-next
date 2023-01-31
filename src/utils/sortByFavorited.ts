import { Prisma } from "@prisma/client"

const CreatedPokemon = Prisma.validator<Prisma.CreatedPokemonArgs>()({
    include: {
        moves: {
            select: {
                move: true,
                moveOrder: true,
            },
            orderBy: {
                moveOrder: "asc",
            },
        },
        evs: {
            select: {
                stat: true,
                value: true,
            },
            orderBy: {
                stat: "desc",
            },
        },
        ivs: {
            select: {
                stat: true,
                value: true,
            },
            orderBy: {
                stat: "desc",
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

type userPokemonArr = Prisma.CreatedPokemonGetPayload<typeof CreatedPokemon>[]

const sortByFavorited = (pokemonArr: userPokemonArr) => {
    return pokemonArr.sort((a, b) => {
        const y = b.favorited[0]?.favoritedAt
            ? Number(b.favorited[0]?.favoritedAt)
            : 1
        const x = a.favorited[0]?.favoritedAt
            ? Number(a.favorited[0]?.favoritedAt)
            : 1
        if (x === y) {
            return b.createdAt.getTime() - a.createdAt.getTime()
        }
        return y - x
    })
}

export { sortByFavorited }
