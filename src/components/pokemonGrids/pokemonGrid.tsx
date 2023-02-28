import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import Link from "next/link"
import { type Pokemon } from "pokenode-ts"
import { api } from "utils/api"

import { PokemonCard } from "../pokemonCards/pokemonCard"
import { PokemonEmpty } from "./ui/pokemonEmpty"
import { SkeletonPokemonGrid } from "./ui/skeletonPokemonGrid"

interface Props {
    query: string
}

export const PokemonGrid = ({ query }: Props) => {
    const {
        data: pokemonData,
        isLoading,
        error,
    } = api.pokeApi.getPokemon.useQuery()

    if (isLoading) {
        return <SkeletonPokemonGrid />
    }

    if (error) return <div>Error: {error.message}</div>

    const pokemons = pokemonData.results as unknown as Pokemon[]
    const showPokemon = pokemons.filter((pokemon) =>
        pokemon.name.includes(query)
    )

    return (
        <>
            {query && pokemons.length === 0 ? (
                <PokemonEmpty query={query} hasPokemon={pokemons?.length > 0} />
            ) : (
                <GridCards pokemons={showPokemon} />
            )}
        </>
    )
}

interface GridCardsProps {
    pokemons: Pokemon[]
}

const GridCards = ({ pokemons }: GridCardsProps) => {
    const pokemonScrolled = useInfiniteScroll(pokemons)
    return (
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
    )
}
