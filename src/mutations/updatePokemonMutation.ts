import { useRouter } from "next/router"
import { type CreatedPokemon } from "../types/trpc"
import { api } from "../utils/api"
import { sortByFavorited } from "../utils/sortByFavorited"
interface UpdateValues {
    ability: string
    nature: string
    heldItem: string
    shiny: boolean
    moves: string[]
    teraType: string
    evs: { stat: string; value: number }[]
    ivs: { stat: string; value: number }[]
}

export const useUpdatePokemonMutation = (
    userId: string,
    createdPokemon: CreatedPokemon,
    {
        ability,
        nature,
        heldItem,
        moves,
        evs,
        ivs,
        shiny,
        teraType,
    }: UpdateValues
) => {
    const router = useRouter()
    const apiContext = api.useContext()
    const updateMutation = api.pokemon.updatePokemon.useMutation({
        onMutate: () => {
            const pastPokemon = apiContext.pokemon.getUsersPokemon.getData({
                userId: userId,
            })

            const pastPokemonStats =
                apiContext.pokemon.getSinglePokemon.getData({
                    pokemonId: createdPokemon.id,
                })

            const updatePokemonData = {
                id: createdPokemon.id,
                userId: userId,
                name: createdPokemon.name,
                ability: ability,
                nature: nature,
                heldItem: heldItem,
                shiny: shiny,
                teraType: teraType,
                createdAt: createdPokemon.createdAt,
                favorited: createdPokemon.favorited,
                moves: [
                    { move: moves[0], moveOrder: 1 },
                    { move: moves[1], moveOrder: 2 },
                    { move: moves[2], moveOrder: 3 },
                    { move: moves[3], moveOrder: 4 },
                ],
                evs: evs,
                ivs: ivs,
                teams: createdPokemon.teams,
            }

            if (pastPokemonStats) {
                apiContext.pokemon.getSinglePokemon.setData(
                    { pokemonId: createdPokemon.id },
                    updatePokemonData
                )
            }

            if (pastPokemon) {
                const sortFavorites = sortByFavorited([
                    updatePokemonData,
                    ...pastPokemon.filter(
                        (pokemon) => pokemon.id !== createdPokemon?.id
                    ),
                ])
                apiContext.pokemon.getUsersPokemon.setData(
                    { userId: userId },
                    sortFavorites
                )
            }
            return { pastPokemon }
        },
        onSuccess: () => {
            void router.push(`/profile/${userId}`)
        },
        onError: (error, variables, context) => {
            if (context?.pastPokemon) {
                apiContext.pokemon.getUsersPokemon.setData(
                    { userId: userId },
                    context.pastPokemon
                )
            }
        },
        onSettled: () => {
            void apiContext.pokemon.getUsersPokemon.invalidate({
                userId: userId,
            })
            void apiContext.pokemon.getSinglePokemon.invalidate({
                pokemonId: createdPokemon.id,
            })
        },
    })

    const movesFormat = [
        {
            move: moves[0],
            moveOrder: 1,
        },
        {
            move: moves[1],
            moveOrder: 2,
        },
        {
            move: moves[2],
            moveOrder: 3,
        },
        {
            move: moves[3],
            moveOrder: 4,
        },
    ]

    const updatePokemon = (pokemonId: string) =>
        updateMutation.mutate({
            id: pokemonId,
            ability: ability,
            nature: nature,
            heldItem: heldItem,
            teraType: teraType,
            moves: movesFormat,
            evs: evs,
            ivs: ivs,
        })

    return { updatePokemon, updateMutation }
}
