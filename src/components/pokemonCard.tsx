import { CreatedPokemon } from "../types/trpc"

import { api } from "utils/api"
import formatString from "utils/formatString"
import { FavoritedButton } from "./ui/favoritedButton"

import { LoadingSpinner } from "./ui/loadingSpinner"

interface Props {
    pokemonName: string
    createdPokemon?: CreatedPokemon
    percentage?: string
    favorite?: boolean
}

// Don't wrap with class so that there is skeleton of card when loading data

const PokemonCard = ({
    pokemonName,
    createdPokemon,
    percentage,
    favorite,
}: Props) => {
    const { data: pokemon, isLoading } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName,
    })

    if (isLoading) return <LoadingSpinner />
    const firstType = pokemon?.types[0].type.name
    const secondType = pokemon?.types[1]?.type.name
    const pokemonImage =
        createdPokemon && createdPokemon?.shiny
            ? pokemon?.sprites.front_shiny
            : pokemon?.sprites.front_default

    return (
        <>
            <div className="p-3">
                <div className="aspect-square rounded-full bg-dark">
                    {pokemonImage && (
                        <img src={pokemonImage} className="w-full" />
                    )}
                </div>
                <h4 className="text-center">
                    {formatString(pokemon?.name ?? "null")}
                </h4>
                {percentage ? (
                    <h4 className="text-center">{percentage}</h4>
                ) : (
                    <div className="flex justify-center gap-2">
                        <h4>{firstType}</h4>
                        <h4>{secondType}</h4>
                    </div>
                )}
            </div>
            {favorite && (
                <FavoritedButton favorited={favorite} handleFavorite={null} />
            )}
        </>
    )
}

export { PokemonCard }
