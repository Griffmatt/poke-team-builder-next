import { type NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import PokemonCard from '../../components/pokemonCard'
import LoadingSpinner from '../../components/ui/loadingSpinner'
import { api } from '../../utils/api'

const Boxes: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query
    const [query, setQuery] = useState('')

    const { data: pokemons } = api.pokemon.getUsersPokemon.useQuery({
        userId: userId as string,
    })
    const { data: user } = api.users.getUser.useQuery({
        userId: userId as string,
    })

    let timer: NodeJS.Timeout | undefined
    const debounceQuery = (queryValue: string) => {
        clearTimeout(timer)
        timer = setTimeout(() => setQuery(queryValue), 1000)
    }

    const filterPokemon = pokemons?.filter((pokemon) =>
        query === 'shiny' ? pokemon.shiny : pokemon.name.includes(query)
    )

    if (!user)
        return (
            <div className="h-[75vh]">
                <LoadingSpinner />
            </div>
        )

    return (
        <main className="grid gap-4">
            <div className="flex justify-between">
                <h2>{user?.name}'s Boxes</h2>
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    onChange={(event) =>
                        debounceQuery(event.target.value.toLowerCase())
                    }
                    className="w-60 rounded-2xl px-4 py-2 text-black outline-none"
                />
            </div>
            {filterPokemon?.length === 0 ? (
                <PokemonEmpty query={query} />
            ) : (
                <div className="pokemonCardGrid">
                    {filterPokemon?.map((pokemon) => {
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
            )}
        </main>
    )
}

export default Boxes

const PokemonEmpty = ({ query }: { query: string }) => {
    if (query) {
        return (
            <div className="mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl text-center dark:bg-dark-2">
                <h2>
                    There were no results
                    <br /> for your query
                </h2>
                <h3>{query}</h3>
            </div>
        )
    }

    return (
        <div className="mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl text-center dark:bg-dark-2">
            <h2>You haven't created any pokemon yet!</h2>
            <Link href="/pokemon">Click here to view pokemon to create</Link>
        </div>
    )
}
