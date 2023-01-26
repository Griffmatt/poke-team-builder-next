import { type NextPage } from 'next'
import Link from 'next/link'
import PokemonCard from '../components/pokemonCard'
import { api } from '../utils/api'

const Home: NextPage = () => {
    const { data: topPokemonData } = api.statistics.getTopPokemon.useQuery()
    const totalPokemon = topPokemonData?.totalPokemon
    const topPokemon = topPokemonData?.topPokemon
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
                                    href={`/pokemon/${pokemon.name}/create`}
                                    key={pokemon.name}
                                    className="pokemon-card"
                                >
                                    <PokemonCard
                                        pokemonName={pokemon.name}
                                        amount={(
                                            (pokemon.amount / totalPokemon) *
                                            100
                                        ).toFixed(2)}
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
                        href={'/pokemon'}
                        className="grid aspect-[4/2] place-items-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                    >
                        <h2>Create Pokemon</h2>
                    </Link>
                    <Link
                        href={'/teams'}
                        className="grid aspect-[4/2] place-items-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3"
                    >
                        <h2>View Teams</h2>
                    </Link>
                    <Link
                        href={'/boxes'}
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
