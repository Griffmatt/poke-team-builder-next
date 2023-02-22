import { useEffect, useState } from "react"
import { api } from "utils/api"
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
    pokemonName: string
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
    pokemonName,
}: Props) => {
    const [clicked, setClicked] = useState(0)
    const moveOrder = formatOrder(order)

    const { data: commonMoves } = api.mostCommon.moves.useQuery({
        pokemonName: pokemonName,
    })

    useEffect(() => {
        setOpenInput("")
    }, [clicked, setOpenInput])

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

    const filterMoves = moves
        .filter((moveName) => !currentMoves.includes(moveName))
        .sort()

    const commonMovesMap = new Map<string, number>()

    commonMoves?.moves.forEach((commonMove) => {
        commonMovesMap.set(commonMove.name, commonMove.amount)
    })

    return (
        <div>
            <h3>{moveOrder} move</h3>
            <button
                className="flex h-8 w-full items-center justify-between rounded-2xl px-4 py-1 dark:bg-dark-2"
                onClick={handleOpen}
                type="button"
            >
                <h4>{formatString(move)}</h4>
            </button>
            <div className="relative">
                {openInput === moveOrder && (
                    <div className="no-scrollbar absolute z-50 h-fit max-h-96 w-full divide-y-2 divide-dark-3 overflow-y-scroll rounded-2xl border-2 border-dark dark:bg-dark-2">
                        {filterMoves.map((moveName) => {
                            const amount = commonMovesMap.get(moveName)
                            const percentage =
                                amount && commonMoves
                                    ? formatPercentage(
                                          amount / commonMoves.total
                                      )
                                    : undefined
                            return (
                                <button
                                    key={moveName}
                                    className="btn-dark-2 top-1 flex h-10 w-full items-center justify-between px-4 py-1 lg:h-8"
                                    type="button"
                                    onClick={(event) =>
                                        handleClick(moveName, event)
                                    }
                                >
                                    <h4>{formatString(moveName)}</h4>
                                    {percentage && <p>{percentage}</p>}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
