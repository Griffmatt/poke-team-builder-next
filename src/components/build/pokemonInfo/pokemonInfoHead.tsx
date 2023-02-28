import { api } from "utils/api"
import { formatStat } from "utils/formatStat"
import { formatString } from "utils/formatString"
import { STATS } from "assets/stats"
import { InfoCard } from "components/pokemonCards/infoCard"
import { LoadingInfoCard } from "components/pokemonCards/ui/loadingInfoCard"

export const PokemonInfoHead = ({ pokemonName }: { pokemonName: string }) => {
    const {
        data: pokemon,
        isLoading,
        error,
    } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName,
    })
    if (isLoading) {
        return (
            <>
                <LoadingInfoCard />
                <div className="lg:col-span-2">
                    <h2>Stats</h2>
                    <div>
                        {STATS.map((stat, index) => {
                            return (
                                <div key={index}>
                                    <h3>{formatString(stat)}:</h3>
                                    <div className="h-4 animate-pulse rounded-full bg-dark-2" />
                                </div>
                            )
                        })}
                    </div>
                    <h3>Total Stats:</h3>
                </div>
            </>
        )
    }

    if (error) return <div>Error: {error.message}</div>

    let totalStats = 0
    return (
        <>
            <InfoCard pokemon={pokemon} />
            <div className="lg:col-span-2">
                <h2>Stats</h2>
                <div>
                    {pokemon.stats.map((stat) => {
                        const maxNumber = 150
                        const limitNumber = Math.min(stat.base_stat, maxNumber)

                        const percentage = Math.trunc(
                            (limitNumber / maxNumber) * 100
                        )
                        totalStats += stat.base_stat
                        const statFormatted = formatStat(stat.stat.name)
                        const bgColor = statFormatted
                        return (
                            <div key={stat.stat.name}>
                                <h3>
                                    {statFormatted}: {stat.base_stat}
                                </h3>
                                <div className="h-4 rounded-full bg-dark-2">
                                    <div
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                        className={`${bgColor} h-4 rounded-full`}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <h3>Total Stats: {totalStats}</h3>
            </div>
        </>
    )
}
