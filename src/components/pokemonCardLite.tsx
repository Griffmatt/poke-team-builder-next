import { api } from "utils/api"
import formatString from "utils/formatString"

import { LoadingSpinner } from "./ui/loadingSpinner"

interface Props {
    pokemonName: string
    percentage: string
}

// Don't wrap with class so that there is skeleton of card when loading data

export const PokemonCardLite = ({ pokemonName, percentage }: Props) => {
    const { data: pokemon, isLoading } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName,
    })

    if (isLoading) return <LoadingSpinner />
    const pokemonImage = pokemon?.sprites.front_default

    return (
        <>
            <div className="flex h-full flex-col justify-around p-3">
                <div className="aspect-square rounded-full bg-dark-3">
                    {pokemonImage && (
                        <img src={pokemonImage} className="w-full" />
                    )}
                </div>
                <div>
                    <h4 className="text-center">
                        {formatString(pokemon?.name ?? "null")}
                    </h4>
                    <h4 className="text-center">{percentage}</h4>
                </div>
            </div>
        </>
    )
}
