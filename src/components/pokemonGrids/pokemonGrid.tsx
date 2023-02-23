import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import { useScreenSize } from "hooks/useScreenSize"
import Link from "next/link"
import { type Pokemon } from "pokenode-ts"
import { useLayoutEffect, useState } from "react"
import { PokemonCard } from "../pokemonCards/pokemonCard"
import { PokemonEmpty } from "./ui/pokemonEmpty"

interface Props {
    pokemons: Pokemon[]
    query?: string
}

export const PokemonGrid = ({ pokemons, query }: Props) => {
    const [initialLimit, setInitialLimit] = useState(30)
    const [loadLimit, setLoadLimit] = useState(6)
    const { width } = useScreenSize()
    const pokemonScrolled = useInfiniteScroll(pokemons, initialLimit, loadLimit)
    const showPokemon = query
        ? pokemons?.filter((pokemon) => pokemon.name.includes(query))
        : pokemonScrolled

    useLayoutEffect(() => {
        if (width >= 1024) {
            setInitialLimit(30)
            setLoadLimit(6)
        }
        if (width < 1024 && width > 640) {
            setInitialLimit(20)
            setLoadLimit(4)
        }
        if (width <= 640 && width >= 425) {
            setInitialLimit(12)
            setLoadLimit(3)
        }
        if (width < 425) {
            setInitialLimit(8)
            setLoadLimit(2)
        }
    }, [width])

    return (
        <>
            {query && showPokemon.length === 0 ? (
                <PokemonEmpty query={query} hasPokemon={pokemons?.length > 0} />
            ) : (
                <div className=" pokemon-grid-card-layout">
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
