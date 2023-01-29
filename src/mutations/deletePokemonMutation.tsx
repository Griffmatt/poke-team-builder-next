import { api } from "../utils/api"
import router from "next/router"

export const deletePokemonMutation = (
    userId: string,
    pokemonId: string,
    pokemonName: string
) => {
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
            const topPokemonData = apiContext.statistics.getTopPokemon.getData()

            if (topPokemonData) {
                const pokeStats = topPokemonData.topPokemon.map((pokeData) => {
                    if (
                        pokeData.name.toLowerCase() ===
                        pokemonName.toLowerCase()
                    )
                        return {
                            name: pokeData.name,
                            amount: pokeData.amount - 1,
                        }
                    return pokeData
                })
                const newData = {
                    totalPokemon: topPokemonData.totalPokemon - 1,
                    topPokemon: pokeStats.sort((a, b) => {
                        if (b.amount === a.amount) {
                            const sortName = [a.name, b.name].sort()
                            if (sortName[0] === b.name) return 1
                            return -1
                        }
                        return b.amount - a.amount
                    }),
                }
                apiContext.statistics.getTopPokemon.setData(undefined, newData)
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
