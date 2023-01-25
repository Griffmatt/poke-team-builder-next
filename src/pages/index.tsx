import { type NextPage } from 'next'
import PokemonCard from '../components/pokemon/pokemonCard'
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
                            <div className="grid w-fit gap-2" key={user.id}>
                                <img
                                    src={user.image ?? ''}
                                    className="rounded-full"
                                />
                                <h3 className="text-center">{user.name}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="grid gap-3">
                <h2>Statistics</h2>
                <h3>Top 10 pokemon</h3>
                <div className="pokemonCardGrid">
                    {topPokemon?.map((pokemon) => {
                        return (
                            <div className="aspect-[4/5] w-full rounded-2xl bg-dark-2 text-center">
                                <PokemonCard pokemonName={pokemon.name} />
                                {totalPokemon && (
                                    <h4>{`${((pokemon.amount / totalPokemon) * 100).toFixed(2)}%`}</h4>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="grid gap-3">
                <h2>What to do?</h2>
            </div>
        </main>
    )
}

export default Home
