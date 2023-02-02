import { api } from "utils/api"
import { CommonDataCard } from "./commonDataCards"

interface Props {
    pokemonName: string
}
export const CommonMoves = ({ pokemonName }: Props) => {
    const { data: moves } = api.mostCommon.moves.useQuery({
        pokemonName: pokemonName,
    })

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
