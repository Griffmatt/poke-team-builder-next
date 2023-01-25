import React from 'react'
import firstLetterUpperCase from '../../utils/firstLetterUpperCase'

interface Props {
  order: string
  moves: {move: {name: string}}[]
  move: string
  setMove: React.Dispatch<React.SetStateAction<string>>
}

export default function MovesInput({ order, moves, move, setMove }: Props) {
  return (
    <label className="flex flex-col">
      {order} Move
      <select
        className="text-dark"
        value={firstLetterUpperCase(move)}
        onChange={(event) => setMove(event.target.value)}
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
              <option
                key={moveOption.move.name}
              >
                {firstLetterUpperCase(moveOption.move.name)}
              </option>
            )
          })}
      </select>
    </label>
  )
}