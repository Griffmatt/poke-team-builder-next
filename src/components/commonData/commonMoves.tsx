import { formatPercentage } from "utils/formatPercentage"
import { formatString } from "utils/formatString"
import { useEffect, type Dispatch, type SetStateAction } from "react"

interface Props {
    movesData: {
        moves: {
            name: string
            amount: number
        }[]
        total: number
    }
    selected: string[]
    setSelected: Dispatch<SetStateAction<string[]>>
}
export const CommonMoves = ({ movesData, selected, setSelected }: Props) => {
    const moves = movesData.moves
    const total = movesData.total

    useEffect(() => {
        const selectedMoves = moves.slice(0, 4).map((move) => move.name)
        setSelected(selectedMoves)
    }, [])

    const handleClick = (moveName: string) => {
        if (selected.includes(moveName)) {
            const filterName = selected.filter((move) => move !== moveName)
            setSelected(filterName)
            return
        }
        if (selected.length >= 4) return

        setSelected([...selected, moveName])
    }

    return (
        <>
            {moves && total > 0 && (
                <div className="w-full">
                    <h3>Common Moves</h3>
                    <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
                        {moves.slice(0, 6).map((move) => {
                            const percentage = formatPercentage(
                                move.amount / total
                            )
                            const moveSelected = selected.includes(move.name)
                            return (
                                <div
                                    className={`flex justify-between rounded px-4 py-2 dark:bg-dark-2 ${
                                        moveSelected &&
                                        "border-2 border-primary"
                                    }`}
                                    key={move.name}
                                    onClick={() => handleClick(move.name)}
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
