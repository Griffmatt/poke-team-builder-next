import { CommonDataGrid } from "./commonData/dataGrid"
import { CommonMoves } from "./commonData/moves"
import { CommonStats } from "./commonData/stats"
import { CommonTeammates } from "./commonData/teammates"

interface Props {
    pokemonName: string
}

export const CommonlyUsedData = ({ pokemonName }: Props) => {
    return (
        <div className="gap-1 xs:col-span-2 lg:col-span-3 xl:col-span-2 xl:col-start-2">
            <h2>Commonly Used</h2>
            <CommonTeammates pokemonName={pokemonName} />
            <CommonDataGrid pokemonName={pokemonName} />
            <CommonMoves pokemonName={pokemonName} />
            <CommonStats pokemonName={pokemonName} />
        </div>
    )
}
