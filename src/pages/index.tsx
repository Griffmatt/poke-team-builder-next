import { type NextPage } from "next"
import { api } from "utils/api"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { formatPercentage } from "utils/formatPercentage"
import { PokemonCard } from "components/pokemonCard"
import { PopularPokemon } from "components/popularPokemon"
import { PopularTeams } from "components/popularTeams"

const Home: NextPage = () => {
    const { data: session } = useSession()
    const { data: topPokemonData } = api.statistics.getTopPokemon.useQuery()
    return (
        <main>
            <h1>Statistics</h1>
            <div className="grid gap-3">
                <h2>Trending Pokemon</h2>
                <div className="pokemon-card-grid">
                    {topPokemonData &&
                        topPokemonData.pokemon.slice(0, 12).map((pokemon) => {
                            const percentage = formatPercentage(
                                pokemon.amount / topPokemonData.total
                            )
                            return (
                                <Link
                                    key={pokemon.name}
                                    href={`/build/pokemon/${pokemon.name}`}
                                    className="pokemon-card"
                                >
                                    <PokemonCard
                                        pokemonName={pokemon.name}
                                        percentage={percentage}
                                    />
                                </Link>
                            )
                        })}
                </div>
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
                <PopularPokemon />
                <PopularTeams />
            </div>
        </main>
    )
}

export default Home
