import { type NextPage } from "next"
import Link from "next/link"
import { useState } from "react"
import { BuildNav } from "components/build/buildNav"
import { PokemonCard } from "components/pokemonCard"
import { api } from "utils/api"
import { useDebounceQuery } from "hooks/useDebounceQuery"

const Pokemon: NextPage = () => {
    const { data: pokemons } = api.pokeApi.getPokemon.useQuery({ limit: 898 })
    const [query, setQuery] = useState("")
    const { debounceQuery } = useDebounceQuery(setQuery)
    const POKEMON_LIMIT = 42

    const limitPokemon =
        pokemons?.results
            .filter((pokemon) => pokemon.name.includes(query))
            .slice(0, POKEMON_LIMIT) ??
        pokemons?.results.slice(0, POKEMON_LIMIT)

    return (
        <main>
            <div className="flex flex-col justify-between gap-2 md:flex-row">
                <h1>Pokedex</h1>
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    onChange={(event) => debounceQuery(event.target.value)}
                    className="rounded-2xl px-4 py-2 text-black outline-none md:w-60"
                />
            </div>
            <BuildNav selected="pokemon" />
            {limitPokemon?.length === 0 ? (
                <div className="mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl text-center dark:bg-dark-2">
                    <h2>
                        There were no results
                        <br /> for your query
                    </h2>
                    <h3>{query}</h3>
                </div>
            ) : (
                <div className="pokemon-card-grid">
                    {limitPokemon?.map((pokemon) => {
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
        </main>
    )
}

export default Pokemon
