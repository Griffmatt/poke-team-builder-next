import { type ChangeEvent } from "react"
import firstLetterUpperCase from "utils/formatString"

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

    return (
        <label className="grid">
            {moveOrder} Move
            <select
                className="text-dark"
                value={firstLetterUpperCase(move)}
                onChange={(event) => handleChange(event)}
            >
                {moves
                    .sort((a, b) => {
                        if (a.move.name < b.move.name) {
                            return -1
                        }
                        if (a.move.name > b.move.name) {
                            return 1
                        }
                        return 0
                    })
                    .map((moveOption: { move: { name: string } }) => {
                        return (
                            <option key={moveOption.move.name}>
                                {firstLetterUpperCase(moveOption.move.name)}
                            </option>
                        )
                    })}
            </select>
        </label>
    )
}
