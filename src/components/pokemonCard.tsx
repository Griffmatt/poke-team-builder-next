import type { inferProcedureOutput } from "@trpc/server"
import { type AppRouter } from "../server/api/root"

import { api } from "../utils/api"
import formatString from "../utils/formatString"

import { LoadingSpinner } from "./ui/loadingSpinner"

type createdPokemon = inferProcedureOutput<
    AppRouter["pokemon"]["getSinglePokemon"]
>

interface Props {
    pokemonName: string
    createdPokemon?: createdPokemon
    percentage?: string
}

const PokemonCard = ({ pokemonName, createdPokemon, percentage }: Props) => {
    const { data: pokemon, isLoading } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName,
    })

    const pokemonImage = createdPokemon?.shiny
        ? pokemon?.sprites.front_shiny
        : pokemon?.sprites.front_default

    if (isLoading) return <LoadingSpinner />
    const firstType = pokemon?.types[0].type.name
    const secondType = pokemon?.types[1]?.type.name

    return (
        <div className="p-3">
            <div className="aspect-square rounded-full bg-dark">
                {pokemonImage && <img src={pokemonImage} className="w-full" />}
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
    )
}

export { PokemonCard }
