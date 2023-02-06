import Link from "next/link"
import { formatPercentage } from "utils/formatPercentage"
import { PokemonCard } from "./cards/pokemonCard"
import { SkeletonPokemonGrid } from "./ui/skeletonPokemonGrid"

interface PokemonData {
    pokemon: {
        name: string
        amount: number
    }[]
    total: number
}
interface Props {
    pokemonData: PokemonData | null
    amount: number
}

export const PokemonDataGrid = ({ pokemonData, amount }: Props) => {
    if (pokemonData == null) return <SkeletonPokemonGrid amount={amount} />
    return (
        <div className="pokemon-card-grid">
            {pokemonData.pokemon.slice(0, amount).map((pokemon) => {
                const percentage = formatPercentage(
                    pokemon.amount / pokemonData.total
                )
                return (
                    <Link
                        key={pokemon.name}
                        href={`/build/pokemon/${pokemon.name}`}
                        className="pokemon-card"
                    >
                        <PokemonCard
                            pokemonName={pokemon.name}
                            percentage={percentage}
                        />
                    </Link>
                )
            })}
        </div>
    )
}
