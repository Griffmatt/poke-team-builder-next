import { useEffect, useState, type ChangeEvent } from "react"
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
    setPokemonData: React.Dispatch<Partial<PokemonValues>>
    currentMoves: string[]
}

export const MovesInput = ({
    order,
    moves,
    move,
    setPokemonData,
    currentMoves,
}: Props) => {
    const [filterTakenMoves, setFilterTakenMoves] = useState(moves)
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        currentMoves[order] = event.target.value
        setPokemonData({ moves: currentMoves })
    }

    const formatOrder = (number: number) => {
        if (number === 0) return "First"
        if (number === 1) return "Second"
        if (number === 2) return "Third"
        return "Fourth"
    }

    const moveOrder = formatOrder(order)

    useEffect(() => {
        console.log(currentMoves)
        const filterMoves = moves.filter(
            (moveData) =>
                formatString(move) === formatString(moveData.move.name) ||
                !currentMoves.includes(formatString(moveData.move.name))
        )
        setFilterTakenMoves(filterMoves)
    }, [...currentMoves])

    return (
        <label className="grid">
            {moveOrder} Move
            <select
                className="text-dark"
                value={formatString(move)}
                onChange={(event) => handleChange(event)}
            >
                {filterTakenMoves
                    .sort((a, b) => {
                        if (a.move.name < b.move.name) {
                            return -1
                        }
                        if (a.move.name > b.move.name) {
                            return 1
                        }
                        return 0
                    })
                    .map(({ move }: { move: { name: string } }) => {
                        return (
                            <option key={move.name}>
                                {formatString(move.name)}
                            </option>
                        )
                    })}
            </select>
        </label>
    )
}
