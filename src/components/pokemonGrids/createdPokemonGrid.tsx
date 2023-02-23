import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import { useScreenSize } from "hooks/useScreenSize"
import Link from "next/link"
import { useState, useLayoutEffect } from "react"
import { type CreatedPokemon } from "types/trpc"
import { PokemonCard } from "../pokemonCards/pokemonCard"
import { PokemonEmpty } from "./ui/pokemonEmpty"

interface Props {
    pokemons: CreatedPokemon[]
    currentUserFavorites?: string[]
    query?: string
    favoriteGrid?: boolean
    userId?: string
    profileGrid?: boolean
}

export const CreatedPokemonGrid = ({
    pokemons,
    currentUserFavorites,
    query,
    favoriteGrid,
    userId,
    profileGrid,
}: Props) => {
    const [initialLimit, setInitialLimit] = useState(24)
    const [loadLimit, setLoadLimit] = useState(6)
    const { width } = useScreenSize()
    const pokemonScrolled = useInfiniteScroll(
        pokemons ?? null,
        initialLimit,
        loadLimit
    )
    const showPokemon = query
        ? pokemons?.filter((pokemon) => pokemon.name.includes(query))
        : pokemonScrolled

    useLayoutEffect(() => {
        if (width >= 1024) {
            setInitialLimit(30)
            setLoadLimit(6)
        }
        if (width < 1024 && width > 640) {
            setInitialLimit(20)
            setLoadLimit(4)
        }
        if (width <= 640 && width >= 425) {
            setInitialLimit(12)
            setLoadLimit(3)
        }
        if (width < 425) {
            setInitialLimit(8)
            setLoadLimit(2)
        }
    }, [width])

    return (
        <>
            {showPokemon.length === 0 ? (
                <PokemonEmpty
                    query={query}
                    hasPokemon={pokemons?.length > 0}
                    favoriteGrid={favoriteGrid}
                    userId={userId}
                />
            ) : (
                <div className="pokemon-grid-card-layout">
                    {pokemons?.map((pokemon) => {
                        const currentUserFavorited =
                            currentUserFavorites?.includes(pokemon.id) ?? false

                        const profileUserFavorited = profileGrid
                            ? pokemon.favorited[0]?.userId === pokemon.userId
                            : undefined
                        const favorited =
                            profileUserFavorited ?? currentUserFavorited

                        return (
                            <Link
                                key={pokemon.id}
                                className="pokemon-card"
                                href={`/profile/${pokemon.userId}/${pokemon.id}/`}
                            >
                                <PokemonCard
                                    pokemonName={pokemon.name}
                                    createdPokemon={pokemon}
                                    favorited={favorited}
                                />
                            </Link>
                        )
                    })}
                </div>
            )}
        </>
    )
}
