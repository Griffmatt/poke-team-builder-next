import { useRouter } from "next/router"
import { Pokemon } from "pokenode-ts"
import { api } from "utils/api"
import { sortByFavorited } from "utils/sortByFavorited"

interface UpdateValues {
    ability: string
    nature: string
    heldItem: string
    shiny: boolean
    teraType: string
    firstMove: string
    secondMove: string
    thirdMove: string
    fourthMove: string
    evs: { stat: string; value: number }[]
    ivs: { stat: string; value: number }[]
}

export const buildPokemonMutation = (
    userId: string,
    pokemon: Pokemon,
    {
        ability,
        nature,
        heldItem,
        shiny,
        teraType,
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
    const buildMutation = api.pokemon.buildPokemon.useMutation({
        onMutate: async () => {
            const pastPokemon = apiContext.pokemon.getUsersPokemon.getData({
                userId: userId,
            })

            const topPokemonData = apiContext.statistics.getTopPokemon.getData()

            const buildPokemonData = {
                id: "placeHolderIdPokemon",
                userId: userId,
                name: pokemon.name,
                ability: ability,
                nature: nature,
                heldItem: heldItem,
                shiny: shiny,
                teraType: teraType,
                createdAt: new Date(),
                favorited: [],
                moves: [
                    { move: firstMove, moveOrder: 1 },
                    { move: secondMove, moveOrder: 2 },
                    { move: thirdMove, moveOrder: 3 },
                    { move: fourthMove, moveOrder: 4 },
                ],
                evs: evs,
                ivs: ivs,
                teams: [],
            }

            if (pastPokemon) {
                const sortFavorites = sortByFavorited([
                    buildPokemonData,
                    ...pastPokemon,
                ])
                apiContext.pokemon.getUsersPokemon.setData(
                    { userId: userId },
                    sortFavorites
                )
            }

            if (topPokemonData) {
                const pokeStats = topPokemonData.pokemon.map((pokeData) => {
                    if (
                        pokeData.name.toLowerCase() ===
                        pokemon.name.toLowerCase()
                    )
                        return {
                            name: pokeData.name,
                            amount: pokeData.amount + 1,
                        }
                    return pokeData
                })

                const newData = {
                    total: topPokemonData.total + 1,
                    pokemon: pokeStats.sort((a, b) => {
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
            return { pastPokemon, topPokemonData }
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
            if (context?.topPokemonData) {
                apiContext.statistics.getTopPokemon.setData(
                    undefined,
                    context?.topPokemonData
                )
            }
        },
        onSettled: () => {
            apiContext.pokemon.getUsersPokemon.invalidate({
                userId: userId,
            })
            apiContext.statistics.getTopPokemon.invalidate()
        },
    })
    return buildMutation
}
