import { useSession } from "next-auth/react"
import Link from "next/link"
import { api } from "utils/api"
import { PokemonCard } from "./pokemonGrids/cards/pokemonCard"

export const PopularPokemon = () => {
    const { data: session } = useSession()
    const { data: popularPokemon } = api.statistics.getPopularPokemon.useQuery()
    const { data: favorites } = api.favorite.checkUserFavoritePokemon.useQuery({
        userId: session?.user?.id ?? null,
    })
    return (
        <div className="grid gap-3">
            <h2>Popular Pokemon</h2>
            <div className="pokemon-card-grid">
                {popularPokemon?.map((pokemon) => {
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
