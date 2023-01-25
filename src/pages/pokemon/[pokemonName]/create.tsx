import { NextPage } from 'next'
import { api } from '../../../utils/api'
import { useRouter } from 'next/router'
import CreatePokemonForm from '../../../components/pokemon/CreatePokemonForm'

const CreatePokemon: NextPage = () => {
    const router = useRouter()
    const { pokemonName } = router.query

    const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName as string,
    })
    const { data: heldItems } = api.pokeApi.getHeldItems.useQuery()

    return (
        <>
            {pokemon && heldItems && (
                <>
                    <h1>Creating pokemon</h1>
                    <CreatePokemonForm
                        pokemon={pokemon}
                        heldItems={heldItems.results}
                    />
                </>
            )}
        </>
    )
}

export default CreatePokemon
