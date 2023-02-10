import { type NextPage } from "next"
import { api } from "utils/api"
import { useRouter } from "next/router"
import { PokemonForm } from "components/build/pokemon/PokemonForm"
import { BackButton } from "components/ui/backButton"
import { formatString } from "utils/formatString"
import { SkeletonPokemonForm } from "components/build/ui/SkeletonPokemonForm"

const CreatePokemon: NextPage = () => {
    const router = useRouter()
    const { pokemonName } = router.query

    const {
        data: pokemon,
        isLoading,
        error,
    } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName as string,
    })
    const {
        data: heldItems,
        isLoading: isLoading2,
        error: error2,
    } = api.pokeApi.getHeldItems.useQuery()

    if (isLoading || isLoading2) {
        return <SkeletonPokemonForm build={true} />
    }

    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>

    return (
        <main>
            <BackButton />
            <h1>Building {formatString(pokemon.name)}</h1>
            <PokemonForm pokemon={pokemon} heldItems={heldItems.results} />
        </main>
    )
}

export default CreatePokemon
