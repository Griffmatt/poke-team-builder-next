import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import Link from "next/link"
import { Pokemon } from "pokenode-ts"
import { PokemonCard } from "../pokemonCards/pokemonCard"
import { PokemonEmpty } from "./ui/pokemonEmpty"

interface Props {
    pokemons: Pokemon[]
    query?: string
}

export const PokemonGrid = ({ pokemons, query }: Props) => {
    const pokemonScrolled = useInfiniteScroll(pokemons)
    let showPokemon = query
        ? pokemons?.filter((pokemon) => pokemon.name.includes(query))
        : pokemonScrolled

    return (
        <>
            {query && showPokemon.length === 0 ? (
                <PokemonEmpty query={query} hasPokemon={pokemons?.length > 0} />
            ) : (
                <div className="pokemon-card-grid">
                    {showPokemon.map((pokemon) => {
                        return (
                            <Link
                                key={pokemon.name}
                                href={`/build/pokemon/${pokemon.name}`}
                                className="pokemon-card"
                            >
                                <PokemonCard pokemonName={pokemon.name} />
                            </Link>
                        )
                    })}
                </div>
            )}
        </>
    )
}
