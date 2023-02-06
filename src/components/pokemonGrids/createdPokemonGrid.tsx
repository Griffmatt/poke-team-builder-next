import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import Link from "next/link"
import { CreatedPokemon } from "types/trpc"
import { PokemonCard } from "./cards/pokemonCard"
import { PokemonEmpty } from "./ui/pokemonEmpty"
import { SkeletonPokemonGrid } from "./ui/skeletonPokemonGrid"

interface Props {
    pokemons: CreatedPokemon[] | null
    query: string
}

export const CreatedPokemonGrid = ({ pokemons, query }: Props) => {
    const [animationParent] = useAutoAnimate()

    const pokemonScrolled = useInfiniteScroll(pokemons ?? null)
    const showPokemon = query
        ? pokemons?.filter((pokemon) => pokemon.name.includes(query))
        : pokemonScrolled
    if (showPokemon == null || pokemons == null) return <SkeletonPokemonGrid />

    return (
        <>
            {query && showPokemon.length === 0 ? (
                <PokemonEmpty query={query} hasPokemon={pokemons?.length > 0} />
            ) : (
                <div className="pokemon-card-grid" ref={animationParent}>
                    {pokemons?.map((pokemon) => {
                        const favorited =
                            pokemon.favorited[0]?.userId === pokemon.userId
                        return (
                            <Link
                                key={pokemon.id}
                                className="pokemon-card"
                                href={`/profile/${pokemon.userId}/${pokemon.id}/`}
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
            )}{" "}
        </>
    )
}
