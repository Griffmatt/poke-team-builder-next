import { type NextPage } from "next"
import { api } from "utils/api"
import { useRouter } from "next/router"
import { PokemonForm } from "components/build/pokemon/PokemonForm"
import { BackButton } from "components/ui/backButton"

const CreatePokemon: NextPage = () => {
    const router = useRouter()
    const { pokemonName } = router.query

    const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName as string,
    })
    const { data: heldItems } = api.pokeApi.getHeldItems.useQuery()

    return (
        <main>
            <BackButton />
            <h1>Building pokemon</h1>
            {pokemon && heldItems && (
                <PokemonForm pokemon={pokemon} heldItems={heldItems.results} />
            )}
        </main>
    )
}

export default CreatePokemon
