import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"
import { useSession } from "next-auth/react"
import { api } from "utils/api"

export const RecentPokemon = () => {
    const { data: session } = useSession()
    const { data: pokemons } = api.pokemon.recentPokemon.useQuery()
    const { data: favorites } = api.favorite.checkUserFavoritePokemon.useQuery({
        userId: session?.user?.id ?? null,
    })
    return (
        <div className="grid gap-3">
            <h2>Recent Pokemon</h2>
            <CreatedPokemonGrid
                pokemons={pokemons ?? null}
                amount={12}
                currentUserFavorites={favorites}
            />
        </div>
    )
}
