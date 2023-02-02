import { api } from "utils/api"
import { CommonDataCard } from "./commonDataCards"

interface Props {
    pokemonName: string
}
export const CommonAbilities = ({ pokemonName }: Props) => {
    const { data: abilities } = api.mostCommon.ability.useQuery({
        pokemonName: pokemonName,
    })

    return (
        <>
            {abilities && abilities?.total > 0 && (
                <div className="w-full">
                    <h3>Common Abilities</h3>
                    <CommonDataCard data={abilities.abilities} total={abilities.total}/>
                </div>
            )}
        </>
    )
}
