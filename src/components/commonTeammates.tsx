import { api } from "../utils/api"
import formatString from "../utils/formatString"
import { PokemonCard } from "./pokemonCard"

interface Props {
    pokemonName: string
}

const CommonTeammates = ({ pokemonName }: Props) => {
    const { data: teammates } = api.mostCommon.teamMates.useQuery({
        pokemonName,
    })
    const { format: formatPercentage } = Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
    })
    return (
        <>
            {teammates && teammates?.totalPokemon > 0 && (
                <>
                    <h3>{formatString(teammates.pokemonName)}</h3>
                    <div className="pokemon-card-grid">
                        <div className="pokemon-card">
                            <PokemonCard pokemonName={teammates.pokemonName} />
                        </div>
                        {teammates?.pokemon.slice(0, 5).map((pokemon) => {
                            const percentage = formatPercentage(
                                pokemon.amount / teammates.totalPokemon
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
                </>
            )}
        </>
    )
}

export { CommonTeammates }
