import { type inferProcedureOutput } from "@trpc/server"
import { type AppRouter } from "../server/api/root"
import { useRouter } from "next/router"
import { api } from "../utils/api"

type Pokemon = inferProcedureOutput<AppRouter["pokeApi"]["getPokemonByName"]>

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

export const buildPokemonMutation = (
    userId: string,
    pokemon: Pokemon,
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
    const buildMutation = api.pokemon.buildPokemon.useMutation({
        onMutate: async () => {
            const pastPokemon = apiContext.pokemon.getUsersPokemon.getData({
                userId: userId,
            })

            const buildPokemonData = {
                id: "placeHolderIdPokemon",
                userId: userId,
                name: pokemon.name,
                ability: ability,
                nature: nature,
                heldItem: heldItem,
                shiny: shiny,
                createdAt: new Date(),
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
                apiContext.pokemon.getUsersPokemon.setData({ userId: userId }, [
                    buildPokemonData,
                    ...pastPokemon,
                ])
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
    return buildMutation
}
