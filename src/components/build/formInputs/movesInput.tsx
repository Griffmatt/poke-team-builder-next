import { useEffect, useMemo, useState } from "react"
import { formatOrder } from "utils/formatOrder"
import { formatPercentage } from "utils/formatPercentage"
import { formatString } from "utils/formatString"

interface PokemonValues {
    ability: string
    nature: string
    heldItem: string
    shiny: boolean
    teraType: string
    moves: string[]
}
interface Props {
    order: number
    moves: { move: { name: string } }[]
    move: string
    setData: React.Dispatch<Partial<PokemonValues>>
    currentMoves: string[]
    openInput: string
    setOpenInput: React.Dispatch<React.SetStateAction<string>>
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export const MovesInput = ({
    order,
    moves,
    move,
    setData,
    currentMoves,
    openInput,
    setOpenInput,
}: Props) => {
    const [unusedMoves, setUnusedMoves] = useState(moves)
    const [clicked, setClicked] = useState(0)
    const moveOrder = formatOrder(order)
    const percentage = formatPercentage(1)

    const handleClick = (move: string, event: ButtonEvent) => {
        event.stopPropagation()
        currentMoves[order] = move
        setData({ moves: currentMoves })
        setClicked(clicked + 1)
    }

    const handleOpen = (event: ButtonEvent) => {
        event.stopPropagation()
        if (moveOrder === openInput) {
            setOpenInput("")
            return
        }
        setOpenInput(moveOrder)
    }

    useEffect(() => {
        setOpenInput("")
    }, [clicked, setOpenInput])

    const filterMoves = useMemo(() => {
        return moves.filter(
            (moveData) =>
                formatString(move) === formatString(moveData.move.name) ||
                !currentMoves.includes(formatString(moveData.move.name))
        )
    }, [currentMoves, move, moves])

    useEffect(() => {
        const sortFilterMoves = filterMoves.sort((a, b) => {
            if (a.move.name < b.move.name) {
                return -1
            }
            if (a.move.name > b.move.name) {
                return 1
            }
            return 0
        })
        setUnusedMoves(sortFilterMoves)
    }, [filterMoves])

    return (
        <div className="grid">
            <h3>{moveOrder} move</h3>
            <button
                className="flex h-8 w-full justify-between rounded-2xl px-4 py-1 dark:bg-dark-2"
                onClick={handleOpen}
                type="button"
            >
                <h4>{formatString(move)}</h4>
                <h4>{percentage}</h4>
            </button>
            <div className="relative">
                {openInput === moveOrder && (
                    <div className="no-scrollbar absolute top-1 z-50 h-fit max-h-96 w-full overflow-y-scroll rounded-2xl dark:bg-dark-2">
                        {unusedMoves.map((moveName) => {
                            return (
                                <button
                                    key={moveName.move.name}
                                    className="btn-dark-2 flex h-10 w-full justify-between border-l-2 border-r-2 border-dark px-4 py-1 lg:h-8"
                                    type="button"
                                    onClick={(event) =>
                                        handleClick(moveName.move.name, event)
                                    }
                                >
                                    <h4>{formatString(moveName.move.name)}</h4>
                                    <h4>{percentage}</h4>
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
