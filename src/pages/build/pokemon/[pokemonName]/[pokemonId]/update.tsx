import { type NextPage } from "next"

import { useRouter } from "next/router"
import { PokemonForm } from "../../../../../components/build/pokemon/PokemonForm"
import { api } from "../../../../../utils/api"


const UpdatePokemon: NextPage = () => {
    const router = useRouter()
    const { pokemonName, pokemonId } = router.query

    const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName as string,
    })
    const { data: heldItems } = api.pokeApi.getHeldItems.useQuery()

    const { data: createdPokemon} = api.pokemon.getSinglePokemon.useQuery({
        pokemonId: pokemonId as string,
    })

    return (
        <>
            <h1>Updating pokemon</h1>
            {pokemon && heldItems && createdPokemon && (
                <PokemonForm
                    pokemon={pokemon}
                    heldItems={heldItems.results}
                    createdPokemon={createdPokemon}
                />
            )}
        </>
    )
}

export default UpdatePokemon
