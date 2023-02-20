import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import Link from "next/link"
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
    const pokemonScrolled = useInfiniteScroll(pokemons ?? null)
    const showPokemon = query
        ? pokemons?.filter((pokemon) => pokemon.name.includes(query))
        : pokemonScrolled

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
                                className={`pokemon-card ${
                                    favorited ? "favorite" : ""
                                }`}
                                href={`/profile/${pokemon.userId}/${pokemon.id}/`}
                            >
                                <PokemonCard
                                    pokemonName={pokemon.name}
                                    createdPokemon={pokemon}
                                />
                            </Link>
                        )
                    })}
                </div>
            )}
        </>
    )
}
