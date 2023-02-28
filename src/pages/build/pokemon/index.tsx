import { type NextPage } from "next"
import { useState } from "react"
import { BuildNav } from "components/build/buildNav"
import { useDebounceQuery } from "hooks/useDebounceQuery"
import { type Pokemon } from "pokenode-ts"
import { PokemonGrid } from "components/pokemonGrids/pokemonGrid"

const Pokemon: NextPage = () => {
    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounceQuery(query)

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
            <PokemonGrid query={debouncedQuery} />
        </main>
    )
}

export default Pokemon
