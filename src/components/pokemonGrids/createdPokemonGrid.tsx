import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import Link from "next/link"
import { CreatedPokemon } from "types/trpc"
import { PokemonCard } from "../pokemonCards/pokemonCard"
import { PokemonEmpty } from "./ui/pokemonEmpty"

interface Props {
    pokemons: CreatedPokemon[]
    currentUserFavorites?: string[]
    query?: string
    favoriteGrid?: boolean
    userId?:string
}

export const CreatedPokemonGrid = ({
    pokemons,
    currentUserFavorites,
    query,
    favoriteGrid,
    userId
}: Props) => {

    const pokemonScrolled = useInfiniteScroll(pokemons ?? null)
    const showPokemon = query
        ? pokemons?.filter((pokemon) => pokemon.name.includes(query))
        : pokemonScrolled

    return (
        <>
            {showPokemon.length === 0 ? (
                <PokemonEmpty query={query} hasPokemon={pokemons?.length > 0} favoriteGrid={favoriteGrid} userId={userId} />
            ) : (
                <div className="pokemon-card-grid">
                    {pokemons?.map((pokemon) => {
                        const favorited = currentUserFavorites
                            ? currentUserFavorites.includes(pokemon.id)
                            : pokemon.favorited[0]?.userId === pokemon.userId

                        return (
                            <Link
                                key={pokemon.id}
                                className={`pokemon-card ${
                                    favorited && "favorite"
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
