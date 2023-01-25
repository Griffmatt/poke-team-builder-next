import { api } from '../../utils/api'

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

export default PokemonCard