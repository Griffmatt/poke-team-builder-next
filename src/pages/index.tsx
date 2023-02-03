import { type NextPage } from "next"
import { api } from "utils/api"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { formatPercentage } from "utils/formatPercentage"
import { PokemonCardLite } from "components/pokemonCardLite"

const Home: NextPage = () => {
    const { data: session } = useSession()
    const { data: topPokemonData } = api.statistics.getTopPokemon.useQuery()
    return (
        <main>
            <h1>Statistics</h1>
            <div className="grid gap-3">
                <h2>Trending Pokemon</h2>
                <div className="grid aspect-[28] grid-cols-2 md:aspect-[14] md:grid-cols-4 lg:aspect-[7] lg:grid-cols-8">
                    {topPokemonData &&
                        topPokemonData.pokemon.slice(0, 8).map((pokemon) => {
                            return (
                                <Link
                                    key={pokemon.name}
                                    href={`/build/pokemon/${pokemon.name}`}
                                    className="aspect-[7/10] w-full"
                                >
                                    <PokemonCardLite
                                        pokemonName={pokemon.name}
                                        percentage={formatPercentage(
                                            pokemon.amount /
                                                topPokemonData.total
                                        )}
                                    />
                                </Link>
                            )
                        })}
                </div>
            </div>
            <div className="grid gap-3">
                <h2>Team of the Day</h2>
            </div>

            <div className="grid gap-3">
                <h2>What to do?</h2>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    <Link
                        href={"/build/pokemon"}
                        className="grid aspect-[4/2] place-items-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                    >
                        <h2>Build Pokemon</h2>
                    </Link>
                    {session?.user ? (
                        <Link
                            href={"/build/team"}
                            className="grid aspect-[4/2] place-items-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                        >
                            <h2>Build Team</h2>
                        </Link>
                    ) : (
                        <div
                            onClick={() => signIn()}
                            className="grid aspect-[4/2] place-items-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                        >
                            <h2>Sign In</h2>
                        </div>
                    )}
                    <Link
                        href={`/profile/${session?.user?.id}`}
                        className="grid aspect-[4/2] place-items-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                    >
                        <h2>View Profile</h2>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Home
