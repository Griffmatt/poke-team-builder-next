import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useInfiniteScroll } from "hooks/useInfiniteScroll"
import Link from "next/link"
import { Pokemon } from "pokenode-ts"
import { PokemonCard } from "./pokemonCard"
import { LoadingCard } from "./ui/loadingCard"

interface Props {
    pokemons: Pokemon[] | null
    query?: string
}

export const PokemonGrid = ({ pokemons, query }: Props) => {
    const [animationParent] = useAutoAnimate()

    const pokemonScrolled = useInfiniteScroll(pokemons ?? null)
    const showPokemon = query
        ? pokemons?.filter((pokemon) => pokemon.name.includes(query))
        : pokemonScrolled
    if (showPokemon == null) return <SkeletonPokemonGrid />

    return (
        <>
            {query && showPokemon.length === 0 ? (
                <QueryNoResults query={query} />
            ) : (
                <div className="pokemon-card-grid" ref={animationParent}>
                    {showPokemon.map((pokemon) => {
                        return (
                            <Link
                                key={pokemon.name}
                                href={`/build/pokemon/${pokemon.name}`}
                                className="pokemon-card"
                            >
                                <PokemonCard pokemonName={pokemon.name} />
                            </Link>
                        )
                    })}
                </div>
            )}
        </>
    )
}

const QueryNoResults = ({ query }: { query: string }) => {
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

export const SkeletonPokemonGrid = () => {
    const fillerArr = new Array(30)
    fillerArr.fill("x", 0, 30)
    return (
        <div className="pokemon-card-grid">
            {fillerArr.map((x, index) => (
                <div className="pokemon-card" key={index}>
                    <LoadingCard />
                </div>
            ))}
        </div>
    )
}
