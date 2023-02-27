import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"
import { useSession } from "next-auth/react"
import { api } from "utils/api"

export const PopularPokemon = () => {
    const { data: session } = useSession()
    const pokemonGridAmount = 12

    const {
        data: popularPokemon,
        isLoading,
        error,
    } = api.statistics.getPopularPokemon.useQuery()

    const {
        data: favorites,
        isLoading: isLoading2,
        error: error2,
        isFetching,
    } = api.favorite.checkUserFavoritePokemon.useQuery(
        {
            userId: session?.user?.id as string,
        },
        { enabled: !!session?.user?.id }
    )

    if (isLoading || (isLoading2 && isFetching)) {
        return (
            <section className="grid gap-3" aria-label="Loading">
                <h2>Popular Pokemon</h2>
                <SkeletonPokemonGrid amount={pokemonGridAmount} />
            </section>
        )
    }
    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>

    return (
        <section className="grid gap-3">
            <h2>Popular Pokemon</h2>
            <CreatedPokemonGrid
                pokemons={popularPokemon?.slice(0, pokemonGridAmount)}
                currentUserFavorites={favorites}
            />
        </section>
    )
}
