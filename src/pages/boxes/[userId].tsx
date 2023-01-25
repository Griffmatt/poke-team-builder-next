import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import PokemonCard from '../../components/pokemonCard'
import { api } from '../../utils/api'

const Boxes: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query
    const { data: pokemons } = api.pokemon.getUsersPokemon.useQuery({
        userId: userId as string,
    })
    const { data: user } = api.users.getUser.useQuery({
        userId: userId as string,
    })
    return (
        <main className="grid gap-4">
            <h2>{user?.name}'s Boxes</h2>
            <div className="pokemonCardGrid">
                {pokemons?.map((pokemon) => {
                    return (
                        <div className="aspect-[4/5] w-full rounded-2xl bg-dark-2">
                            <PokemonCard
                                pokemonName={pokemon.name}
                                createdPokemon={pokemon}
                            />
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default Boxes
