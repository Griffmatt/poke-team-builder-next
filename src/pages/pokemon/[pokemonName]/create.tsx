import { NextPage } from 'next'
import { api } from '../../../utils/api'
import { useRouter } from 'next/router'
import CreatePokemonForm from '../../../components/pokemon/CreatePokemonForm'
import LoadingSpinner from '../../../components/ui/loadingSpinner'

const CreatePokemon: NextPage = () => {
    const router = useRouter()
    const { pokemonName } = router.query

    const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName as string,
    })
    const { data: heldItems } = api.pokeApi.getHeldItems.useQuery()

    if (!pokemon || !heldItems) return <LoadingSpinner />

    return (
        <>
            <h1>Creating pokemon</h1>
            <CreatePokemonForm
                pokemon={pokemon}
                heldItems={heldItems.results}
            />
        </>
    )
}

export default CreatePokemon
