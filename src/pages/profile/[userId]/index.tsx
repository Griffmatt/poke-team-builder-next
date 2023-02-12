import { type NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

import { api } from "utils/api"

import { ProfileNav } from "components/profile/profileNav"
import { useDebounceQuery } from "hooks/useDebounceQuery"
import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"

const ProfilePokemon: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query

    const [query, setQuery] = useState("")
    const debouncedValue = useDebounceQuery(query)

    const {
        data: pokemons,
        isLoading,
        error,
    } = api.pokemon.getUsersPokemon.useQuery({
        userId: userId as string,
    })
    const {
        data: user,
        isLoading: isLoading2,
        error: error2,
    } = api.users.getUser.useQuery({
        userId: userId as string,
    })

    if (isLoading || isLoading2) {
        return (
            <main>
                <ProfileNav
                    selected="pokemon"
                    userId={userId as string}
                    user={user}
                />
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    onChange={(event) => setQuery(event.target.value)}
                    className="ml-auto rounded-2xl px-4 py-2 text-black outline-none md:w-60"
                />
                <SkeletonPokemonGrid />
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>

    const filterPokemon = pokemons?.filter((pokemon) =>
        query === "shiny"
            ? pokemon.shiny
            : pokemon.name.includes(debouncedValue)
    )

    return (
        <main>
            <ProfileNav
                selected="pokemon"
                userId={userId as string}
                user={user}
            />
            <input
                placeholder="Search for a pokemon..."
                type="text"
                onChange={(event) => setQuery(event.target.value)}
                className="ml-auto rounded-2xl px-4 py-2 text-black outline-none md:w-60"
            />
            <CreatedPokemonGrid
                pokemons={filterPokemon}
                query={debouncedValue}
                userId={userId as string}
            />
        </main>
    )
}

export default ProfilePokemon
