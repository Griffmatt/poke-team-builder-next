import { type NextPage } from 'next'
import Link from 'next/link'
import PokemonCard from '../components/pokemonCard'
import { api } from '../utils/api'

const Home: NextPage = () => {
    const { data: users } = api.users.getSuggestedUsers.useQuery()
    const { data: topPokemonData } = api.statistics.getTopPokemon.useQuery()
    const totalPokemon = topPokemonData?.totalPokemon
    const topPokemon = topPokemonData?.topPokemon
    return (
        <main className="grid gap-4">
            <div className="grid gap-3">
                <h2>Suggested Trainers</h2>
                <div className="grid grid-cols-5 place-items-center">
                    {users?.slice(0, 4).map((user) => {
                        return (
                            <Link  href={`/boxes/${user.id}`}className="grid w-fit gap-2" key={user.id}>
                                <img
                                    src={user.image ?? ''}
                                    className="rounded-full"
                                />
                                <h3 className="text-center">{user.name}</h3>
                            </Link>
                        )
                    })}
                </div>
            </div>
            {topPokemon && totalPokemon && (
                <div className="grid gap-3">
                    <h2>Statistics</h2>
                    <h3>Top 10 Pokemon</h3>
                    <div className="pokemonCardGrid">
                        {topPokemon.map((pokemon) => {
                            return (
                                <Link
                                    href={`/pokemon/${pokemon.name}/create`}
                                    key={pokemon.name}
                                    className="aspect-[4/5] w-full rounded-2xl bg-dark-2"
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <Link href={'/pokemon'} className="aspect-[4/2] rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3 grid place-items-center">
                        <h2>Create Pokemon</h2>
                    </Link>
                    <Link href={'/teams'} className="aspect-[4/2] rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3 grid place-items-center">
                        <h2>View Teams</h2>
                    </Link>
                    <Link href={'/boxes'} className="aspect-[4/2] rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3 grid place-items-center">
                        <h2>View Profile</h2>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Home
