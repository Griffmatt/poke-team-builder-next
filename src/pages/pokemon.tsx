import { type NextPage } from 'next'
import { useState } from 'react'

import { api } from '../utils/api'


let timer: NodeJS.Timeout | undefined

const Pokemon: NextPage = () => {
    const { data: pokemons } = api.pokeApi.getPokemon.useQuery({ limit: 898 })
      const [query, setQuery] = useState('')

    const debounceQuery = (queryValue: string) => {
        clearTimeout(timer)
        timer = setTimeout(
          () =>
            setQuery(
                queryValue
            ),
          1000,
        )
      }

    const limitPokemon = pokemons?.results.filter(pokemon => pokemon.name.includes(query)).slice(0, 20) ?? pokemons?.results.slice(0, 20)

    return (
        <main className="grid gap-4">
            <div className="flex justify-between text-">
                <h2>Pokemon listed here!</h2>
                <input placeholder="Search for a pokemon..." type="text" onChange={(event) => debounceQuery(event.target.value.toLowerCase())} className="px-4 py-2 rounded-2xl w-60 text-black outline-none"/>
            </div>
            <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-5">
                {limitPokemon?.map((pokemon) => {
                    return (
                        <div
                            key={pokemon?.name}
                            className="aspect-[4/5] w-full rounded-2xl bg-dark-2"
                        >
                            <PokemonCard pokemonName={pokemon.name} />
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

const PokemonCard = ({ pokemonName }: { pokemonName: string }) => {
    const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName,
    })
    return (
        <>
            <div className="aspect-square">
                <img
                    src={pokemon?.sprites.front_default ?? ''}
                    className="w-full"
                />
            </div>
            <h3 className="text-center">{pokemon?.name}</h3>
        </>
    )
}

export default Pokemon
