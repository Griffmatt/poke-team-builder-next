import { useSession } from "next-auth/react"
import { api } from "../utils/api"
import { sortByFavorited } from "../utils/sortByFavorited"
import { CreatedPokemon } from "../types/trpc"

const addFavoritePokemonMutation = (createdPokemon: CreatedPokemon) => {
    const apiContext = api.useContext()
    const { data: session } = useSession()
    const addFavorite = api.favorite.favoritePokemon.useMutation({
        onMutate: async () => {
            const userFavorites =
                apiContext.favorite.getUserFavoritePokemon.getData({
                    userId: session?.user!.id as string,
                })

            const usersPokemon = apiContext.pokemon.getUsersPokemon.getData({
                userId: session?.user!.id as string,
            })

            if (userFavorites) {
                apiContext.favorite.getUserFavoritePokemon.setData(
                    { userId: session?.user!.id as string },
                    [...userFavorites, createdPokemon!.id]
                )
            }

            if (session?.user!.id === createdPokemon?.userId && usersPokemon) {
                const mapPokemon = usersPokemon.map((userPokemon) => {
                    if (userPokemon.id === createdPokemon?.id)
                        return {
                            ...userPokemon,
                            favorited: [
                                {
                                    userId: session?.user!.id as string,
                                    favoritedAt: new Date(),
                                },
                            ],
                        }

                    return userPokemon
                })
                const sortPokemon = sortByFavorited(mapPokemon)
                apiContext.pokemon.getUsersPokemon.setData(
                    {
                        userId: session?.user?.id as string,
                    },
                    sortPokemon
                )
            }

            return { userFavorites, usersPokemon }
        },
        onError: (error, variables, context) => {
            apiContext.favorite.getUserFavoritePokemon.setData(
                { userId: session?.user!.id as string },
                context?.userFavorites
            )
            apiContext.pokemon.getUsersPokemon.setData(
                {
                    userId: session?.user?.id as string,
                },
                context?.usersPokemon
            )
        },
        onSettled: () => {
            apiContext.favorite.getUserFavoritePokemon.invalidate()
            apiContext.pokemon.getUsersPokemon.invalidate()

        },
    })
    return addFavorite
}

export { addFavoritePokemonMutation }
