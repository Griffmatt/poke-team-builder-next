import { useSession } from "next-auth/react"
import { api } from "utils/api"
import { CreatedPokemonGrid } from "./pokemonGrids/createdPokemonGrid"

export const PopularPokemon = () => {
    const { data: session } = useSession()
    const { data: pokemons } = api.statistics.getPopularPokemon.useQuery()
    const { data: favorites } = api.favorite.checkUserFavoritePokemon.useQuery({
        userId: session?.user?.id ?? null,
    })
    return (
        <div className="grid gap-3">
            <h2>Popular Pokemon</h2>
            <CreatedPokemonGrid
                pokemons={pokemons ?? null}
                amount={12}
                currentUserFavorites={favorites}
            />
        </div>
    )
}
