import { type NextPage } from "next"
import { api } from "utils/api"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { PopularPokemon } from "components/popularPokemon"
import { PopularTeams } from "components/popularTeams"
import { PokemonDataGrid } from "components/pokemonGrids/pokemonDataGrid"

const Home: NextPage = () => {
    const { data: session } = useSession()
    const { data: pokemonData } = api.statistics.getTopPokemon.useQuery()
    return (
        <main>
            <h1>Statistics</h1>
            <div className="grid gap-3">
                <h2>Trending Pokemon</h2>
                <PokemonDataGrid
                    pokemonData={pokemonData ?? null}
                    amount={12}
                />
            </div>
            <div className="grid gap-3">
                <h2>What to do?</h2>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    <Link
                        href={"/build/pokemon"}
                        className="flex aspect-[4/2] items-center justify-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                    >
                        <h2>Build Pokemon</h2>
                    </Link>
                    {session?.user ? (
                        <Link
                            href={"/build/team"}
                            className="flex aspect-[4/2] items-center justify-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                        >
                            <h2>Build Team</h2>
                        </Link>
                    ) : (
                        <div
                            onClick={() => signIn()}
                            className="flex aspect-[4/2] items-center justify-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                        >
                            <h2>Sign In</h2>
                        </div>
                    )}
                    <Link
                        href={`/profile/${session?.user?.id}`}
                        className="flex aspect-[4/2] items-center justify-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                    >
                        <h2>View Profile</h2>
                    </Link>
                </div>
                <PopularPokemon />
                <PopularTeams />
            </div>
        </main>
    )
}

export default Home
