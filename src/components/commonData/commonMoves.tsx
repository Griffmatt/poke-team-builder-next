import { CommonDataCard } from "./commonDataCard"

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
                        <CommonDataCard
                            data={moves.moves}
                            total={moves.total}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
