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
    } = api.pokeApi.getPokemon.useQuery({
        limit: 898,
    })
    const [query, setQuery] = useState("")
    const debouncedValue = useDebounceQuery(query)

    if (isLoading) {
        return (
            <main>
                <div className="flex flex-col justify-between gap-2 md:flex-row">
                    <h1>Pokedex</h1>
                    <input
                        placeholder="Search for a pokemon..."
                        type="text"
                        onChange={(event) => setQuery(event.target.value)}
                        className="rounded-2xl px-4 py-2 text-black outline-none md:w-60"
                    />
                </div>
                <BuildNav selected="pokemon" />
                <SkeletonPokemonGrid />
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>

    const pokemons = pokemonData?.results as unknown as Pokemon[]

    return (
        <main>
            <div className="flex flex-col justify-between gap-2 md:flex-row">
                <h1>Pokedex</h1>
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    onChange={(event) => setQuery(event.target.value)}
                    className="rounded-2xl px-4 py-2 text-black outline-none md:w-60"
                />
            </div>
            <BuildNav selected="pokemon" />
            <PokemonGrid pokemons={pokemons} query={debouncedValue} />
        </main>
    )
}

export default Pokemon
