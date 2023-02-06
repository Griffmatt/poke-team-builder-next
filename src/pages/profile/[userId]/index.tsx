import { type NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

import { api } from "utils/api"

import Link from "next/link"
import { PokemonCard } from "components/pokemonCard"
import { ProfileNav } from "components/profile/profileNav"
import { PokemonEmpty } from "components/pokemonEmpty"
import { useDebounceQuery } from "hooks/useDebounceQuery"
import { useAutoAnimate } from "@formkit/auto-animate/react"

const ProfilePokemon: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query
    const [query, setQuery] = useState("")

    const [animationParent] = useAutoAnimate()

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
        <>
            {user && (
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
                    {filterPokemon?.length === 0 ? (
                        <>
                            {pokemons && (
                                <PokemonEmpty
                                    query={query}
                                    hasPokemon={pokemons?.length > 0}
                                />
                            )}
                        </>
                    ) : (
                        <div
                            className="pokemon-card-grid"
                            ref={animationParent}
                        >
                            {filterPokemon?.map((pokemon) => {
                                const favorited =
                                    pokemon.favorited[0]?.userId ===
                                    pokemon.userId
                                return (
                                    <Link
                                        key={pokemon.id}
                                        className="pokemon-card"
                                        href={`/profile/${user?.id}/${pokemon.id}/`}
                                    >
                                        <PokemonCard
                                            pokemonName={pokemon.name}
                                            createdPokemon={pokemon}
                                            favorite={favorited}
                                        />
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </main>
            )}
        </>
    )
}

export default ProfilePokemon
