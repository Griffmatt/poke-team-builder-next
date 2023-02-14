import { useSession } from "next-auth/react"
import { api } from "utils/api"
import { sortByFavorited } from "utils/sortByFavorited"
import { type CreatedPokemon } from "types/trpc"

const useAddFavoritePokemonMutation = (createdPokemon: CreatedPokemon) => {
    const apiContext = api.useContext()
    const { data: session } = useSession()

    const addFavoritePokemon = api.favorite.favoritePokemon.useMutation({
        onMutate: () => {
            const userFavorites =
                apiContext.favorite.checkUserFavoritePokemon.getData({
                    userId: session?.user?.id as string,
                })

            const usersPokemon = apiContext.pokemon.getUsersPokemon.getData({
                userId: session?.user?.id as string,
            })

            if (userFavorites) {
                apiContext.favorite.checkUserFavoritePokemon.setData(
                    { userId: session?.user?.id as string },
                    [...userFavorites, createdPokemon.id]
                )
            }

            if (session?.user?.id === createdPokemon?.userId && usersPokemon) {
                const mapPokemon = usersPokemon.map((userPokemon) => {
                    if (userPokemon.id === createdPokemon?.id)
                        return {
                            ...userPokemon,
                            favorited: [
                                {
                                    userId: session?.user?.id as string,
                                    favoritedAt: new Date(),
                                },
                            ],
                        }

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

            const usersFavoritedPokemon =
                apiContext.favorite.getUserFavoritePokemon.getData({
                    userId: session?.user?.id as string,
                })

            if (usersFavoritedPokemon) {
                apiContext.favorite.getUserFavoritePokemon.setData(
                    {
                        userId: session?.user?.id as string,
                    },
                    [createdPokemon, ...usersFavoritedPokemon]
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
    return addFavoritePokemon
}

export { useAddFavoritePokemonMutation }
