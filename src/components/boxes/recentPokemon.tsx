import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"
import { useSession } from "next-auth/react"
import { api } from "utils/api"

interface Props {
    title?: string
    amount?: number
}

export const RecentPokemon = ({ title, amount = 12 }: Props) => {
    const { data: session } = useSession()
    const { data: pokemons } = api.pokemon.recentPokemon.useQuery()
    const { data: favorites } = api.favorite.checkUserFavoritePokemon.useQuery({
        userId: session?.user?.id ?? null,
    })
    return (
        <div className="grid gap-3">
            <h2>Recent Pokemon</h2>
            <CreatedPokemonGrid
                pokemons={pokemons?.slice(0, amount) ?? null}
                amount={amount}
                currentUserFavorites={favorites}
            />
        </div>
    )
}
