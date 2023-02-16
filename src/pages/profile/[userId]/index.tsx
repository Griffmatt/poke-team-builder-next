import { type NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { api } from "utils/api"
import { ProfileNav } from "components/profile/profileNav"
import { useDebounceQuery } from "hooks/useDebounceQuery"
import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"
import { useSession } from "next-auth/react"

const ProfilePokemon: NextPage = () => {
    const { data: session } = useSession()
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
        data: userData,
        isLoading: isLoading2,
        error: error2,
        isFetching,
    } = api.users.getUser.useQuery(
        { userId: userId as string },
        {
            enabled: session?.user?.id !== userId,
        }
    )

    const user = userData || isFetching ? userData : session?.user
    if (isLoading || (isLoading2 && isFetching)) {
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
                    className="ml-auto w-full rounded-2xl px-4 py-2 text-black md:w-60"
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
                className="ml-auto w-full rounded-2xl px-4 py-2 text-black md:w-60"
            />
            <CreatedPokemonGrid
                pokemons={filterPokemon}
                query={debouncedValue}
                userId={userId as string}
                profileGrid={true}
            />
        </main>
    )
}

export default ProfilePokemon
