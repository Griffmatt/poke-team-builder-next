import { type NextPage } from "next"
import { api } from "../utils/api"
import Link from "next/link"
import { PokemonCard } from "../components/pokemonCard"

const Home: NextPage = () => {
    const { data: topPokemonData } = api.statistics.getTopPokemon.useQuery()
    const totalPokemon = topPokemonData?.totalPokemon
    const topPokemon = topPokemonData?.topPokemon
    const { format: formatPercentage } = Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
    })
    return (
        <main>
            {topPokemon && totalPokemon && (
                <div className="grid gap-3">
                    <h2>Statistics</h2>
                    <h3>Most Used Pokemon</h3>
                    <div className="pokemon-card-grid">
                        {topPokemon.map((pokemon) => {
                            return (
                                <Link
                                    key={pokemon.name}
                                    href={`/build/pokemon/${pokemon.name}/create`}
                                    className="pokemon-card"
                                >
                                    <PokemonCard
                                        pokemonName={pokemon.name}
                                        percentage={formatPercentage(
                                            pokemon.amount / totalPokemon
                                        )}
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
            <div className="grid gap-3">
                <h2>What to do?</h2>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
                    <Link
                        href={"/build/pokemon"}
                        className="grid aspect-[4/2] place-items-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                    >
                        <h2>Build Pokemon</h2>
                    </Link>
                    <Link
                        href={"/build/team"}
                        className="grid aspect-[4/2] place-items-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                    >
                        <h2>Build Team</h2>
                    </Link>
                    <Link
                        href={"/boxes"}
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
