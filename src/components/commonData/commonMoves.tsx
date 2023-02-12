import { formatPercentage } from "utils/formatPercentage"
import { formatString } from "utils/formatString"

interface Props {
    moves: {
        moves: {
            name: string
            amount: number
        }[]
        total: number
    }
}
export const CommonMoves = ({ moves }: Props) => {
    return (
        <>
            {moves && moves?.total > 0 && (
                <div className="w-full">
                    <h3>Common Moves</h3>
                    <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
                    {moves.moves.slice(0, 6).map((move) => {
                            const percentage = formatPercentage(
                                move.amount / moves.total
                            )
                            return (
                                <div
                                    className="flex justify-between rounded px-4 py-2 dark:bg-dark-2"
                                    key={move.name}
                                >
                                    <h4>{formatString(move.name)}</h4>
                                    <h5>{percentage}</h5>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
