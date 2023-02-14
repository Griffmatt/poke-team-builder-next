import { type CreatedPokemon } from "../../types/trpc"

import { api } from "utils/api"
import { formatString } from "utils/formatString"

import { LoadingCard } from "./ui/loadingCard"
import Image from "next/image"

interface Props {
    pokemonName: string
    createdPokemon?: CreatedPokemon
    percentage?: string
}

// Don't wrap with class so that there is skeleton of card when loading data

export const PokemonCard = ({
    pokemonName,
    createdPokemon,
    percentage,
}: Props) => {
    const {
        data: pokemon,
        isLoading,
        error,
    } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName,
    })

    //poke api sends invalid JSON at first so add error handling here so the error message doesn't flash in and out
    if (isLoading || error) return <LoadingCard />

    const firstType = pokemon.types[0].type.name
    const secondType = pokemon.types[1]?.type.name
    const pokemonImage =
        createdPokemon && createdPokemon.shiny
            ? pokemon.sprites.front_shiny
            : pokemon.sprites.front_default

    return (
        <div className="flex h-full flex-col justify-around p-3">
            <div className="aspect-square rounded-full bg-dark-3">
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
            <div>
                <h4 className="text-center">{formatString(pokemon.name)}</h4>
                {percentage ? (
                    <h4 className="text-center">{percentage}</h4>
                ) : (
                    <div className="flex justify-center gap-2">
                        <h4
                            className={`${firstType} w-20 rounded-2xl border-2 p-1 text-center`}
                        >
                            {formatString(firstType)}
                        </h4>
                        {secondType && (
                            <h4
                                className={`${secondType} w-20 rounded-2xl border-2 p-1 text-center`}
                            >
                                {formatString(secondType)}
                            </h4>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
