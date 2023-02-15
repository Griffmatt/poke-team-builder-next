import Link from "next/link"
import { formatPercentage } from "utils/formatPercentage"
import { PokemonCard } from "../pokemonCards/pokemonCard"

interface PokemonData {
    pokemon: {
        name: string
        amount: number
    }[]
    total: number
}
interface Props {
    pokemonData: PokemonData
    amount: number
}

export const PokemonDataGrid = ({ pokemonData, amount }: Props) => {
    return (
        <div className="pokemon-data-grid">
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
