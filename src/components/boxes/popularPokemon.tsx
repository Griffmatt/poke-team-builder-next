import Link from "next/link"
import React from "react"
import { api } from "../../utils/api"
import { PokemonCard } from "../pokemonCard"

const PopularPokemon = () => {
    const { data: popularPokemon } = api.statistics.getPopularPokemon.useQuery()
    return (
        <div className="grid gap-3">
            <h3>Popular Pokemon</h3>
            <div className="pokemon-card-grid">
                {popularPokemon?.map((pokemon) => {
                    return (
                        <Link
                            href={`/profile/${pokemon.userId}/${pokemon.id}`}
                            className="pokemon-card"
                            key={pokemon.id}
                        >
                            <PokemonCard
                                pokemonName={pokemon.name}
                                createdPokemon={pokemon}
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export { PopularPokemon }
