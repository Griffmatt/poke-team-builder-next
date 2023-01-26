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

const PokemonCard = ({ pokemonName, createdPokemon, percentage}: Props) => {
    const { data: pokemon, isLoading } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName,
    })

    const pokemonImage = createdPokemon?.shiny
        ? pokemon?.sprites.front_shiny
        : pokemon?.sprites.front_default

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="grid gap-4 p-3">
            <div className="aspect-square rounded-full bg-dark">
                {pokemonImage && <img src={pokemonImage} className="w-full" />}
            </div>
            <h3 className="text-center">
                {formatString(pokemon?.name ?? "null")}
            </h3>
            {percentage && <h3 className="text-center">{percentage}</h3>}
        </div>
    )
}

export { PokemonCard }
