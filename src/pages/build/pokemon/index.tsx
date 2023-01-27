import { type NextPage } from "next"
import Link from "next/link"
import { useState } from "react"
import { BuildNav } from "../../../components/build/buildNav"
import { PokemonCard } from "../../../components/pokemonCard"
import { api } from "../../../utils/api"

const Pokemon: NextPage = () => {
    const { data: pokemons } = api.pokeApi.getPokemon.useQuery({ limit: 898 })
    const [query, setQuery] = useState("")
    const POKEMON_LIMIT = 24

    let timer: NodeJS.Timeout | undefined
    const debounceQuery = (queryValue: string) => {
        clearTimeout(timer)
        timer = setTimeout(() => setQuery(queryValue), 1000)
    }

    const limitPokemon =
        pokemons?.results
            .filter((pokemon) => pokemon.name.includes(query))
            .slice(0, POKEMON_LIMIT) ??
        pokemons?.results.slice(0, POKEMON_LIMIT)

    return (
        <main>
            <div className="flex justify-between">
                <h2>Pokedex</h2>
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    onChange={(event) =>
                        debounceQuery(event.target.value.toLowerCase())
                    }
                    className="w-60 rounded-2xl px-4 py-2 text-black outline-none"
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
                                href={`/build/pokemon/${pokemon.name}/create`}
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
