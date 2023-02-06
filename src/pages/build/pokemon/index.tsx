import { type NextPage } from "next"
import { useEffect, useState } from "react"
import { BuildNav } from "components/build/buildNav"
import { api } from "utils/api"
import { useDebounceQuery } from "hooks/useDebounceQuery"
import { type Pokemon } from "pokenode-ts"
import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import { PokemonGrid } from "components/pokemonGrid"

const Pokemon: NextPage = () => {
    const { data: pokemonData } = api.pokeApi.getPokemon.useQuery({
        limit: 898,
    })
    const [query, setQuery] = useState("")
    const debouncedValue = useDebounceQuery(query)
    const [initialLimit, setInitialLimit] = useState(30)

    //used to check for screen size when using infinite scrolling

    useEffect(() => {
        if (screen.width >= 768 && screen.width < 1024) {
            setInitialLimit(15)
        }
    }, [])

    const pokemons = pokemonData?.results as unknown as Pokemon[]
    const pokemonScrolled = useInfiniteScroll(pokemons ?? null, initialLimit)
    const showPokemon = debouncedValue
        ? pokemons?.filter((pokemon) => pokemon.name.includes(debouncedValue))
        : pokemonScrolled

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
            <PokemonGrid pokemons={showPokemon ?? null} query={debouncedValue} />
        </main>
    )
}

export default Pokemon
