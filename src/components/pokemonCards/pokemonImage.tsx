import Image from "next/image"

import { type CreatedPokemon } from "types/trpc"
import { api } from "utils/api"

interface Props {
    pokemonName: string
    createdPokemon?: CreatedPokemon
}

// Don't wrap with class so that there is skeleton of card when loading data

export const PokemonImage = ({ pokemonName, createdPokemon }: Props) => {
    const {
        data: pokemon,
        isLoading,
        error,
    } = api.pokeApi.getPokemonByName.useQuery({ name: pokemonName })

    if (isLoading)
        return (
            <div className="aspect-square rounded-full border-8 border-dark bg-dark-3" />
        )

    if (error) return <div>Error: {error.message}</div>

    const pokemonImage = createdPokemon?.shiny
        ? pokemon.sprites.front_shiny
        : pokemon.sprites.front_default

    const pokemonTypes = pokemon.types.map((type, index) => {
        if (index === 1) {
            return `${type.type.name}Secondary`
        }
        return type.type.name
    })

    return (
        <div
            className={`aspect-square w-full rounded-full border-8 bg-dark-3 ${pokemonTypes[0]} ${pokemonTypes[1]}`}
        >
            {pokemonImage && (
                <Image
                    src={pokemonImage}
                    className="w-full"
                    alt={pokemon.name}
                    width="96"
                    height="96"
                    priority
                />
            )}
        </div>
    )
}
