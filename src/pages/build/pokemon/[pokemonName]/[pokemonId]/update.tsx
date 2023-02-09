import { type NextPage } from "next"

import { useRouter } from "next/router"
import { PokemonForm } from "components/build/pokemon/PokemonForm"
import { api } from "utils/api"
import { BackButton } from "components/ui/backButton"
import { formatString } from "utils/formatString"

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
        const fillerArr = Array.from({ length: 6 }, () => 0)
        return (
            <main>
                <BackButton />
                <div className="h-8 w-32 animate-pulse bg-dark-2" />
                <div className="grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-3">
                    <div className="h-fit w-full xl:row-span-2">
                        <div className="flex h-full flex-col justify-around p-3">
                            <div className="aspect-square animate-pulse rounded-full bg-dark-3" />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="h-6 w-32 animate-pulse bg-dark-2" />
                        <div>
                            {fillerArr.map((_, index) => {
                                return (
                                    <div key={index}>
                                        <div className="h-6" />
                                        <div className="h-6 animate-pulse rounded-full bg-dark-2" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>
    if (error3) return <div>Error: {error3.message}</div>

    return (
        <main>
            <BackButton />
            <h1>Building {formatString(pokemon.name)}</h1>
            {pokemon && heldItems && createdPokemon && (
                <PokemonForm
                    pokemon={pokemon}
                    heldItems={heldItems.results}
                    createdPokemon={createdPokemon}
                />
            )}
        </main>
    )
}

export default UpdatePokemon
