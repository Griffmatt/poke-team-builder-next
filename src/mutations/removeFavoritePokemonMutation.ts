import { useSession } from "next-auth/react"
import { api } from "../utils/api"
import { sortByFavorited } from "../utils/sortByFavorited"
import { type CreatedPokemon } from "../types/trpc"

const useRemoveFavoritePokemonMutation = (createdPokemon: CreatedPokemon) => {
    const apiContext = api.useContext()
    const { data: session } = useSession()
    const removeFavoritePokemon = api.favorite.unfavoritePokemon.useMutation({
        onMutate: () => {
            const userFavorites =
                apiContext.favorite.checkUserFavoritePokemon.getData({
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
                        userId: session?.user?.id,
                    },
                    sortPokemon
                )
            }

            if (userFavorites) {
                apiContext.favorite.checkUserFavoritePokemon.setData(
                    { userId: session?.user?.id as string },
                    userFavorites.filter((fav) => fav !== createdPokemon?.id)
                )
            }

            const usersFavoritedPokemon =
                apiContext.favorite.getUserFavoritePokemon.getData({
                    userId: session?.user?.id as string,
                })

            if (usersFavoritedPokemon) {
                const filterPokemon = usersFavoritedPokemon.filter(
                    (pokemon) => pokemon.id !== createdPokemon.id
                )
                apiContext.favorite.getUserFavoritePokemon.setData(
                    {
                        userId: session?.user?.id as string,
                    },
                    filterPokemon
                )
            }

            return { userFavorites, usersPokemon, usersFavoritedPokemon }
        },
        onError: (error, variables, context) => {
            apiContext.favorite.checkUserFavoritePokemon.setData(
                { userId: session?.user?.id as string },
                context?.userFavorites
            )
            apiContext.pokemon.getUsersPokemon.setData(
                {
                    userId: session?.user?.id as string,
                },
                context?.usersPokemon
            )

            apiContext.favorite.getUserFavoritePokemon.setData(
                {
                    userId: session?.user?.id as string,
                },
                context?.usersFavoritedPokemon
            )
        },
        onSettled: () => {
            void apiContext.favorite.checkUserFavoritePokemon.invalidate()
            void apiContext.pokemon.getUsersPokemon.invalidate()
            void apiContext.favorite.getUserFavoritePokemon.invalidate()
        },
    })

    return removeFavoritePokemon
}

export { useRemoveFavoritePokemonMutation }
