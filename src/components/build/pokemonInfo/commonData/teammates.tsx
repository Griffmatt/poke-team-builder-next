import { PokemonDataGrid } from "components/pokemonGrids/pokemonDataGrid"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"
import { api } from "utils/api"

interface Props {
    pokemonName: string
}

export const CommonTeammates = ({ pokemonName }: Props) => {
    const {
        data: teammates,
        isLoading,
        error,
    } = api.mostCommon.teammates.useQuery({
        pokemonName,
    })

    if (isLoading)
        return (
            <div className="gird gap-3">
                <h3>Teammates</h3>
                <SkeletonPokemonGrid amount={6} dataGrid={true} />
            </div>
        )
    if (error) return <div>Error: {error.message}</div>
    return (
        <>
            {teammates.total > 0 && (
                <div className="gird gap-3">
                    <h3>Teammates</h3>
                    <PokemonDataGrid pokemonData={teammates} amount={6} />
                </div>
            )}
        </>
    )
}
