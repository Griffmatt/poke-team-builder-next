import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"
import { useRouter } from "next/router"
import { api } from "utils/api"

export const FavoritePokemon = () => {
    const router = useRouter()
    const { userId } = router.query

    const {
        data: pokemons,
        isLoading,
        error,
    } = api.favorite.getUserFavoritePokemon.useQuery({
        userId: userId as string,
    })

    if (isLoading) {
        return (
            <div className="grid gap-3">
                <h2>Pokemon</h2>
                <SkeletonPokemonGrid />
            </div>
        )
    }

    if (error) return <div>Error: {error.message}</div>

    return (
        <section className="grid gap-3">
            <h2>Pokemon</h2>
            <CreatedPokemonGrid
                pokemons={pokemons}
                favoriteGrid={true}
                userId={userId as string}
                profileGrid={true}
            />
        </section>
    )
}
