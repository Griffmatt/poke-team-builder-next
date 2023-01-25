import { api } from '../../utils/api'
import type { inferProcedureOutput } from '@trpc/server'
import { AppRouter } from '../../server/api/root'

type createdPokemon = inferProcedureOutput<
    AppRouter['pokemon']['getSinglePokemon']
>

const PokemonCard = ({
    pokemonName,
    createdPokemon,
}: {
    pokemonName: string
    createdPokemon?: createdPokemon
}) => {
    const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName,
    })
    const pokemonImage = createdPokemon?.shiny
        ? pokemon?.sprites.front_shiny
        : pokemon?.sprites.front_default
    return (
        <>
            <div className="aspect-square">
                {pokemonImage && <img src={pokemonImage} className="w-full" />}
            </div>
            <h3 className="text-center">{pokemon?.name}</h3>
        </>
    )
}

export default PokemonCard
