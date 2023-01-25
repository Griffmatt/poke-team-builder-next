import { api } from '../utils/api'
import type { inferProcedureOutput } from '@trpc/server'
import { AppRouter } from '../server/api/root'
import formatString from '../utils/formatString'
import LoadingSpinner from './ui/loadingSpinner'

type createdPokemon = inferProcedureOutput<
    AppRouter['pokemon']['getSinglePokemon']
>

interface Props {
    pokemonName: string
    createdPokemon?: createdPokemon
    amount?: string
}

const PokemonCard = ({ pokemonName, createdPokemon, amount }: Props) => {
    const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName,
    })

    if (!pokemon) return <LoadingSpinner />

    const pokemonImage = createdPokemon?.shiny
        ? pokemon?.sprites.front_shiny
        : pokemon?.sprites.front_default

    return (
        <>
            <div className="aspect-square">
                {pokemonImage && <img src={pokemonImage} className="w-full" />}
            </div>
            <h3 className="text-center">{formatString(pokemon.name)}</h3>
            {amount && <h3 className="text-center">{`${amount}%`}</h3>}
        </>
    )
}

export default PokemonCard
