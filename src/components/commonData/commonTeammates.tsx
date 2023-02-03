import Link from "next/link"
import { api } from "utils/api"
import { formatPercentage } from "utils/formatPercentage"
import { PokemonCard } from "../pokemonCard"

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
                    <div className="grid grid-cols-2 md:grid-cols-6">
                        {teammates?.pokemon.slice(0, 6).map((pokemon) => {
                            const percentage = formatPercentage(
                                pokemon.amount / teammates.total
                            )
                            return (
                                <Link
                                    href={`/build/pokemon/${pokemon.name}`}
                                    className="w-full"
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

