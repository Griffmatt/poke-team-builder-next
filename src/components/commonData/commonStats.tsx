import { useSelectedContext } from "context/selectedContext"
import { useEffect } from "react"

interface Props {
    stats: {
        stat: string
        value: number
    }[][]
}

export const CommonStats = ({ stats }: Props) => {
    const { statsIndex, handleStatsChange } = useSelectedContext()

    useEffect(() => {
        handleStatsChange(stats[0], 0)
    }, [handleStatsChange, stats])

    return (
        <div className="w-full">
            <h3>Stats</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {stats.map((statsData, index) => {
                    const selectedStats = index === statsIndex
                    return (
                        <button
                            className={`grid grid-cols-6 rounded border-2 px-4 py-2 text-center dark:bg-dark-2 ${
                                selectedStats
                                    ? "border-primary"
                                    : "dark:border-dark-2"
                            }`}
                            key={`stats${index}`}
                            onClick={() => handleStatsChange(statsData, index)}
                        >
                            {statsData.map((ev) => {
                                return (
                                    <div key={`${ev.stat}EV${index}`}>
                                        <h3>{ev.stat}</h3>
                                        <p>{ev.value}</p>
                                    </div>
                                )
                            })}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
