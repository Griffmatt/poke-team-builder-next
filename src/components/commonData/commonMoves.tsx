import { formatPercentage } from "utils/formatPercentage"
import { formatString } from "utils/formatString"
import { useEffect, useMemo } from "react"
import { useSelectedContext } from "context/selectedContext"

interface Props {
    movesData: {
        moves: {
            name: string
            amount: number
        }[]
        total: number
    }
}
export const CommonMoves = ({ movesData }: Props) => {
    const { moves, total } = movesData
    const initialMoves = useMemo(
        () => movesData.moves.slice(0, 4).map((move) => move.name),
        [movesData]
    )

    const { selectedPokemonData, handleMovesChange, setInitialMoves } =
        useSelectedContext()

    useEffect(() => {
        setInitialMoves(initialMoves)
    }, [initialMoves, setInitialMoves])

    return (
        <>
            {moves && total > 0 && (
                <div className="w-full">
                    <h3>Moves</h3>
                    <div className="grid gap-1 xs:grid-cols-2 md:grid-cols-3">
                        {moves.slice(0, 6).map((move) => {
                            const percentage = formatPercentage(
                                move.amount / total
                            )
                            const moveSelected =
                                selectedPokemonData.moves.includes(move.name)
                            return (
                                <button
                                    className={`flex items-center justify-between rounded border-2 bg-dark-2 px-4 py-2 ${
                                        moveSelected
                                            ? "border-primary"
                                            : "border-dark-2"
                                    }`}
                                    key={move.name}
                                    onClick={() => handleMovesChange(move.name)}
                                >
                                    <h3>{formatString(move.name)}</h3>
                                    <p>{percentage}</p>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
