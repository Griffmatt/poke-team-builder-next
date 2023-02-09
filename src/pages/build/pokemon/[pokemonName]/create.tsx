import { type NextPage } from "next"
import { api } from "utils/api"
import { useRouter } from "next/router"
import { PokemonForm } from "components/build/pokemon/PokemonForm"
import { BackButton } from "components/ui/backButton"
import { formatString } from "utils/formatString"

const CreatePokemon: NextPage = () => {
    const router = useRouter()
    const { pokemonName } = router.query

    const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName as string,
    })
    const { data: heldItems } = api.pokeApi.getHeldItems.useQuery()

    if (pokemon == null || heldItems == null) {
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

    return (
        <main>
            <BackButton />
            <h1>Building {formatString(pokemon.name)}</h1>
            {pokemon && heldItems && (
                <PokemonForm pokemon={pokemon} heldItems={heldItems.results} />
            )}
        </main>
    )
}

export default CreatePokemon
