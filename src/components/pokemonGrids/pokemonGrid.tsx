import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import Link from "next/link"
import { Pokemon } from "pokenode-ts"
import { PokemonCard } from "./cards/pokemonCard"
import { PokemonEmpty } from "./ui/pokemonEmpty"
import { SkeletonPokemonGrid } from "./ui/skeletonPokemonGrid"

interface Props {
    pokemons: Pokemon[] | null
    query?: string
}

export const PokemonGrid = ({ pokemons, query }: Props) => {
    const [animationParent] = useAutoAnimate()

    const pokemonScrolled = useInfiniteScroll(pokemons ?? null)
    const showPokemon = query
        ? pokemons?.filter((pokemon) => pokemon.name.includes(query))
        : pokemonScrolled
    if (showPokemon == null || pokemons == null) return <SkeletonPokemonGrid />

    return (
        <>
            {query && showPokemon.length === 0 ? (
                <PokemonEmpty query={query} hasPokemon={pokemons?.length > 0}/>
            ) : (
                <div className="pokemon-card-grid" ref={animationParent}>
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

