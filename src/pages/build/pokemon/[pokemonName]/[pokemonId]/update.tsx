import { type NextPage } from "next"

import { useRouter } from "next/router"
import { PokemonForm } from "components/build/PokemonForm"
import { api } from "utils/api"
import { formatString } from "utils/formatString"
import { SkeletonPokemonForm } from "components/build/ui/SkeletonPokemonForm"

const UpdatePokemon: NextPage = () => {
    const router = useRouter()
    const { pokemonName, pokemonId } = router.query

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

    const {
        data: createdPokemon,
        isLoading: isLoading3,
        error: error3,
    } = api.pokemon.getSinglePokemon.useQuery({
        pokemonId: pokemonId as string,
    })

    if (isLoading || isLoading2 || isLoading3) {
        return (
            <SkeletonPokemonForm
                build={false}
                pokemonName={pokemonName as string}
            />
        )
    }

    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>
    if (error3) return <div>Error: {error3.message}</div>

    return (
        <main>
            <h1 className="w-fit">Building {formatString(pokemon.name)}</h1>
            {pokemon && heldItems && createdPokemon && (
                <PokemonForm
                    pokemon={pokemon}
                    heldItems={heldItems}
                    createdPokemon={createdPokemon}
                />
            )}
        </main>
    )
}

export default UpdatePokemon
