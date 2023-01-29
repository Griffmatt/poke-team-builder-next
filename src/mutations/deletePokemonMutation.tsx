import { api } from "../utils/api"
import router from "next/router"

export const deletePokemonMutation = (userId: string, pokemonId: string) => {
    const apiContext = api.useContext()
    const deletePokemon = api.pokemon.deletePokemon.useMutation({
        onMutate: async () => {
            const pastPokemon = apiContext.pokemon.getUsersPokemon.getData({
                userId: userId,
            })

            if (pastPokemon) {
                apiContext.pokemon.getUsersPokemon.setData(
                    { userId: userId },
                    pastPokemon.filter((pokemon) => {
                        return pokemon.id !== pokemonId
                    })
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
        },
    })
    return deletePokemon
}
