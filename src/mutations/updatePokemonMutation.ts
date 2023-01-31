import { useRouter } from "next/router"
import { CreatedPokemon } from "../types/trpc"
import { api } from "../utils/api"
import { sortByFavorited } from "../utils/sortByFavorited"
interface UpdateValues {
    ability: string
    nature: string
    heldItem: string
    shiny: boolean
    firstMove: string
    secondMove: string
    thirdMove: string
    fourthMove: string
    evs: { stat: string; value: number }[]
    ivs: { stat: string; value: number }[]
}

export const updatePokemonMutation = (
    userId: string,
    createdPokemon: CreatedPokemon,
    {
        ability,
        nature,
        heldItem,
        shiny,
        firstMove,
        secondMove,
        thirdMove,
        fourthMove,
        evs,
        ivs,
    }: UpdateValues
) => {
    const router = useRouter()
    const apiContext = api.useContext()
    const updateMutation = api.pokemon.updatePokemon.useMutation({
        onMutate: async () => {
            const pastPokemon = apiContext.pokemon.getUsersPokemon.getData({
                userId: userId,
            })

            const pastPokemonStats =
                apiContext.pokemon.getSinglePokemon.getData({
                    pokemonId: createdPokemon!.id,
                })

            const updatePokemonData = {
                id: createdPokemon!.id,
                userId: userId,
                name: createdPokemon!.name,
                ability: ability,
                nature: nature,
                heldItem: heldItem,
                shiny: shiny,
                teraType: createdPokemon!.teraType,
                createdAt: createdPokemon!.createdAt,
                favorited: createdPokemon!.favorited,
                moves: [
                    { move: firstMove, moveOrder: 1 },
                    { move: secondMove, moveOrder: 2 },
                    { move: thirdMove, moveOrder: 3 },
                    { move: fourthMove, moveOrder: 4 },
                ],
                evs: evs,
                ivs: ivs,
                teams: createdPokemon!.teams,
            }

            if (pastPokemonStats) {
                apiContext.pokemon.getSinglePokemon.setData(
                    { pokemonId: createdPokemon!.id },
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
            router.push(`/profile/${userId}`)
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
            apiContext.pokemon.getUsersPokemon.invalidate({
                userId: userId,
            })
            apiContext.pokemon.getSinglePokemon.invalidate({
                pokemonId: createdPokemon!.id,
            })
        },
    })

    return updateMutation
}
