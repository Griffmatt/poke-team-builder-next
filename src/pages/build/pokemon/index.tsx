import { type NextPage } from "next"
import { useState } from "react"
import { BuildNav } from "components/build/buildNav"
import { api } from "utils/api"
import { useDebounceQuery } from "hooks/useDebounceQuery"
import { type Pokemon } from "pokenode-ts"
import { PokemonGrid } from "components/pokemonGrids/pokemonGrid"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"

const Pokemon: NextPage = () => {
    const {
        data: pokemonData,
        isLoading,
        error,
    } = api.pokeApi.getPokemon.useQuery()
    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounceQuery(query)

    if (isLoading) {
        return (
            <main>
                <h1>Pokedex</h1>
                <BuildNav selected="pokemon" />
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    onChange={(event) => setQuery(event.target.value)}
                    className="ml-auto w-full rounded-2xl px-4 py-2 text-black md:w-60"
                />
                <SkeletonPokemonGrid />
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>

    const pokemons = pokemonData.results as unknown as Pokemon[]
    const showPokemon = pokemons.filter((pokemon) =>
        pokemon.name.includes(debouncedQuery)
    )

    return (
        <main>
            <h1>Pokedex</h1>
            <BuildNav selected="pokemon" />
            <input
                placeholder="Search for a pokemon..."
                type="text"
                onChange={(event) => setQuery(event.target.value)}
                className="ml-auto w-full rounded-2xl px-4 py-2 text-black md:w-60"
            />
            <PokemonGrid pokemons={showPokemon} query={debouncedQuery} />
        </main>
    )
}

export default Pokemon
