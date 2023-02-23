import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import Link from "next/link"
import { type Pokemon } from "pokenode-ts"
import { PokemonCard } from "../pokemonCards/pokemonCard"
import { PokemonEmpty } from "./ui/pokemonEmpty"

interface Props {
    pokemons: Pokemon[]
    query?: string
}

export const PokemonGrid = ({ pokemons, query }: Props) => {
    const pokemonScrolled = useInfiniteScroll(pokemons)

    return (
        <>
            {query && pokemons.length === 0 ? (
                <PokemonEmpty query={query} hasPokemon={pokemons?.length > 0} />
            ) : (
                <div className=" pokemon-grid-card-layout">
                    {pokemonScrolled.map((pokemon) => {
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
