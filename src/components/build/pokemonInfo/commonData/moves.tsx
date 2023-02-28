import { formatPercentage } from "utils/formatPercentage"
import { formatString } from "utils/formatString"
import { useEffect, useMemo } from "react"
import { useSelectedContext } from "context/selectedContext"
import { api } from "utils/api"

interface Props {
    pokemonName: string
}
export const CommonMoves = ({ pokemonName }: Props) => {
    const {
        data: movesData,
        isLoading,
        error,
    } = api.mostCommon.moves.useQuery({
        pokemonName,
    })
    const initialMoves = useMemo(
        () => movesData?.moves.slice(0, 4).map((move) => move.name),
        [movesData]
    )

    const { selectedPokemonData, handleMovesChange, setInitialMoves } =
        useSelectedContext()

    useEffect(() => {
        if (initialMoves) {
            setInitialMoves(initialMoves)
        }
    }, [initialMoves, setInitialMoves])

    if (isLoading) return <SkeletonDataCards />
    if (error) return <div>Error: {error.message}</div>

    return (
        <>
            {movesData.total > 0 && (
                <div>
                    <h3>Moves</h3>
                    <div className="grid gap-1 xs:grid-cols-2 md:grid-cols-3">
                        {movesData.moves.slice(0, 6).map((move) => {
                            const percentage = formatPercentage(
                                move.amount / movesData.total
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

const SkeletonDataCards = () => {
    const fillerArr = Array.from({ length: 6 }, () => 0)

    return (
        <div>
            <h3>Moves</h3>
            <div className="grid gap-1 xs:grid-cols-2 md:grid-cols-3">
                {fillerArr.map((_, index) => {
                    return (
                        <button
                            className="flex animate-pulse items-center justify-between rounded border-2 border-dark-2 bg-dark-2 py-2"
                            key={index}
                        >
                            <h3 className="text-transparent">x</h3>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
