import { PokemonCard } from "components/pokemonCard"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { api } from "utils/api"

export const RecentPokemon = () => {
    const { data: session } = useSession()
    const { data: recentPokemon } = api.pokemon.recentPokemon.useQuery()
    const { data: favorites } = api.favorite.checkUserFavoritePokemon.useQuery({
        userId: session?.user?.id as string,
    })
    return (
        <div className="grid gap-3">
            <h2>Recent Pokemon</h2>
            <div className="pokemon-card-grid">
                {recentPokemon?.map((pokemon) => {
                    const favorite = favorites?.includes(pokemon.id)
                    return (
                        <Link
                            href={`/profile/${pokemon.userId}/${pokemon.id}`}
                            className="pokemon-card"
                            key={pokemon.id}
                        >
                            <PokemonCard
                                pokemonName={pokemon.name}
                                createdPokemon={pokemon}
                                favorite={favorite}
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}