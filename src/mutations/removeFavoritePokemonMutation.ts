import { useSession } from "next-auth/react"
import { api } from "../utils/api"
import { sortByFavorited } from "../utils/sortByFavorited"
import { CreatedPokemon } from "../types/trpc"

const removeFavoritePokemonMutation = (createdPokemon: CreatedPokemon) => {
    const apiContext = api.useContext()
    const { data: session } = useSession()
    const removeFavorite = api.favorite.unfavoritePokemon.useMutation({
        onMutate: async () => {
            const userFavorites =
                apiContext.favorite.getUserFavoritePokemon.getData({
                    userId: session?.user?.id as string,
                })

            const usersPokemon = apiContext.pokemon.getUsersPokemon.getData({
                userId: session?.user?.id as string,
            })

            if (session?.user?.id === createdPokemon?.userId && usersPokemon) {
                const mapPokemon = usersPokemon.map((userPokemon) => {
                    if (userPokemon.id === createdPokemon?.id)
                        return { ...userPokemon, favorited: [] }

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

            if (userFavorites) {
                apiContext.favorite.getUserFavoritePokemon.setData(
                    { userId: session?.user!.id as string },
                    userFavorites.filter((fav) => fav !== createdPokemon?.id)
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
            apiContext.pokemon.getSinglePokemon.invalidate()
        },
    })

    return removeFavorite
}

export { removeFavoritePokemonMutation }
