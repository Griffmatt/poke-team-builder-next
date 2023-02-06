import { useAutoAnimate } from "@formkit/auto-animate/react"
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

    if (pokemons === null) {
        const fillerArr = new Array(30)
        fillerArr.fill("x", 0, 30)
        return (
            <div className="pokemon-card-grid" ref={animationParent}>
                {fillerArr.map(() => (
                    <div className="pokemon-card">
                        <LoadingCard />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
            {query && pokemons.length === 0 ? (
                <QueryNoResults query={query} />
            ) : (
                <div className="pokemon-card-grid" ref={animationParent}>
                    {pokemons.map((pokemon) => {
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
