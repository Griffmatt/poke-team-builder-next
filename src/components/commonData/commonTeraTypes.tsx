import { api } from "utils/api"
import { CommonDataCard } from "./commonDataCards"

interface Props {
    pokemonName: string
}
export const CommonTeraTypes = ({ pokemonName }: Props) => {
    const { data: teraTypes } = api.mostCommon.teraType.useQuery({
        pokemonName: pokemonName,
    })

    return (
        <>
            {teraTypes && teraTypes?.total > 0 && (
                <div className="w-full">
                    <h3>Common Tera Types</h3>
                    <div className="grid gap-1">
                        <CommonDataCard
                            data={teraTypes.teraTypes}
                            total={teraTypes.total}
                        />
                    </div>
                </div>
            )}
        </>
    )
}