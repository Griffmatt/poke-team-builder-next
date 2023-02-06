import Link from "next/link"
import { api } from "utils/api"
import { formatPercentage } from "utils/formatPercentage"
import { PokemonCard } from "../pokemonGrids/cards/pokemonCard"

interface Props {
    pokemonName: string
}

export const CommonTeammates = ({ pokemonName }: Props) => {
    const { data: teammates } = api.mostCommon.teamMates.useQuery({
        pokemonName,
    })
    return (
        <>
            {teammates && teammates?.total > 0 && (
                <div>
                    <h3>Common Teammates</h3>
                    <div className="pokemon-card-grid">
                        {teammates?.pokemon.slice(0, 6).map((pokemon) => {
                            const percentage = formatPercentage(
                                pokemon.amount / teammates.total
                            )
                            return (
                                <Link
                                    href={`/build/pokemon/${pokemon.name}`}
                                    className="pokemon-card"
                                    key={pokemon.name}
                                >
                                    <PokemonCard
                                        pokemonName={pokemon.name}
                                        percentage={percentage}
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
