import { useSelectedContext } from "context/selectedContext"
import { useEffect } from "react"
import { api } from "utils/api"

interface Props {
    pokemonName: string
}

export const CommonStats = ({ pokemonName }: Props) => {
    const { statsIndex, handleStatsChange } = useSelectedContext()

    const {
        data: stats,
        isLoading,
        error,
    } = api.mostCommon.stats.useQuery({
        pokemonName,
    })

    useEffect(() => {
        if (stats && stats[0]) {
            handleStatsChange(stats[0], 0)
        }
    }, [handleStatsChange, stats])

    if (isLoading) return <SkeletonDataCards />
    if (error) return <div>Error: {error.message}</div>

    return (
        <>
            {stats.length > 0 && (
                <div>
                    <h3>Stats</h3>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {stats.map((statsData, index) => {
                            const selectedStats = index === statsIndex
                            return (
                                <button
                                    className={`grid grid-cols-6 rounded border-2 bg-dark-2 px-4 py-2 text-center ${
                                        selectedStats
                                            ? "border-primary"
                                            : "border-dark-2"
                                    }`}
                                    key={`stats${index}`}
                                    onClick={() =>
                                        handleStatsChange(statsData, index)
                                    }
                                >
                                    {statsData.map((ev) => {
                                        return (
                                            <div key={`${ev.stat}EV${index}`}>
                                                <h4>{ev.stat}</h4>
                                                <p>{ev.value}</p>
                                            </div>
                                        )
                                    })}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

const SkeletonDataCards = () => {
    const fillerArr = Array.from({ length: 4 }, () => 0)

    return (
        <div>
            <h3>Stats</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {fillerArr.map((_, index) => {
                    return (
                        <button
                            className="grid grid-cols-6 rounded border-2 border-dark-2 bg-dark-2 py-2 text-center"
                            key={index}
                        >
                            <div>
                                <h4 className="text-transparent">x</h4>
                                <p className="text-transparent">x</p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
