import { api } from "../utils/api"
import formatString from "../utils/formatString"
import { PokemonCardGrid } from "./pokemonCardGrid"

interface Props {
    pokemonName: string
}

const CommonTeammates = ({ pokemonName }: Props) => {
    const { data: teammates } = api.mostCommon.teamMates.useQuery({
        pokemonName,
    })
    return (
        <>
            {teammates?.pokemon && teammates?.total > 0 && (
                <>
                    <h3>{formatString(teammates.pokemonName)}</h3>
                    <PokemonCardGrid totalPokemon={teammates} linkTo="build" />
                </>
            )}
        </>
    )
}

export { CommonTeammates }
