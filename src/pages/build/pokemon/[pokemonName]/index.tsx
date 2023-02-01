import { PokemonCard } from "components/pokemonCard"
import { BackButton } from "components/ui/backButton"
import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { api } from "utils/api"

const SinglePokemon: NextPage = () => {
    const router = useRouter()
    const { pokemonName } = router.query
    const { data: session } = useSession()

    const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName as string,
    })

    return (
        <main>
            <BackButton />
            <h1>PokeDex Entry</h1>
            {pokemon && (
                <div className="grid gap-3 p-2 md:grid-cols-2 lg:grid-cols-3">
                    <div className="w-full md:row-span-2 lg:col-span-1">
                        <PokemonCard pokemonName={pokemon.name} />
                    </div>
                    <div className="md:col-span-2">
                        <h2>Stats</h2>
                    </div>
                    <div className="md:col-span-2">
                        <h2>Data</h2>
                    </div>
                    {session?.user?.id && (
                        <div className="grid gap-3 md:col-span-2 md:col-start-2 lg:col-start-3">
                            <button className="w-full rounded-2xl px-4 py-2">
                                <Link
                                    href={`/build/pokemon/${pokemon?.name}/create`}
                                >
                                    See Builds
                                </Link>
                            </button>
                            <button className="w-full rounded-2xl px-4 py-2">
                                <Link
                                    href={`/build/pokemon/${pokemon?.name}/create`}
                                >
                                    Build Pokemon
                                </Link>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}

export default SinglePokemon
