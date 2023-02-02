import { api } from "utils/api"
import { formatPercentage } from "utils/formatPercentage"
import { PokemonCard } from "../pokemonCard"

interface Props {
    pokemonName: string
}

const CommonTeammates = ({ pokemonName }: Props) => {
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
                                <div
                                    className="pokemon-card"
                                    key={pokemon.name}
                                >
                                    <PokemonCard
                                        pokemonName={pokemon.name}
                                        percentage={percentage}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export { CommonTeammates }
