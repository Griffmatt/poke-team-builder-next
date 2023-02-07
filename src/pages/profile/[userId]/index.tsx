import { type NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

import { api } from "utils/api"

import { ProfileNav } from "components/profile/profileNav"
import { useDebounceQuery } from "hooks/useDebounceQuery"
import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"

const ProfilePokemon: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query
    const [query, setQuery] = useState("")

    const { data: pokemons } = api.pokemon.getUsersPokemon.useQuery({
        userId: userId as string,
    })
    const { data: user } = api.users.getUser.useQuery({
        userId: userId as string,
    })

    const debouncedValue = useDebounceQuery(query)

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
                pokemons={filterPokemon ?? null}
                query={debouncedValue}
            />
        </main>
    )
}

export default ProfilePokemon
