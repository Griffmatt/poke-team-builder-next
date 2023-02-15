import { useEffect, useState } from "react"
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
    moves: string[]
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

    const filterMoves = moves
        .filter(
            (moveName) => move === moveName || !currentMoves.includes(moveName)
        )
        .sort()

    return (
        <div>
            <h3>{moveOrder} move</h3>
            <button
                className="flex h-8 w-full items-center justify-between rounded-2xl px-4 py-1 dark:bg-dark-2"
                onClick={handleOpen}
                type="button"
            >
                <h4>{formatString(move)}</h4>
                <p>{percentage}</p>
            </button>
            <div className="relative">
                {openInput === moveOrder && (
                    <div className="no-scrollbar absolute top-1 z-50 h-fit max-h-96 w-full overflow-y-scroll rounded-2xl border-2 border-dark dark:bg-dark-2">
                        {filterMoves.map((moveName) => {
                            return (
                                <button
                                    key={moveName}
                                    className="btn-dark-2 flex h-10 w-full items-center justify-between px-4 py-1 lg:h-8"
                                    type="button"
                                    onClick={(event) =>
                                        handleClick(moveName, event)
                                    }
                                >
                                    <h4>{formatString(moveName)}</h4>
                                    <p>{percentage}</p>
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
