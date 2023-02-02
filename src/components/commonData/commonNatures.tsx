import { api } from "utils/api"
import { CommonDataCard } from "./commonDataCards"

interface Props {
    pokemonName: string
}
export const CommonNatures = ({ pokemonName }: Props) => {
    const { data: natures } = api.mostCommon.nature.useQuery({
        pokemonName: pokemonName,
    })

    return (
        <>
            {natures && natures?.total > 0 && (
                <div className="w-full">
                    <h3>Common Natures</h3>
                    <CommonDataCard data={natures.natures} total={natures.total}/>
                </div>
            )}
        </>
    )
}
