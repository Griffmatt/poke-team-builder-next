import { api } from "utils/api"
import { CommonDataCard } from "./commonDataCards"

interface Props {
    pokemonName: string
}
export const CommonHeldItems = ({ pokemonName }: Props) => {
    const { data: heldItems } = api.mostCommon.heldItems.useQuery({
        pokemonName: pokemonName,
    })

    return (
        <>
            {heldItems && heldItems?.total > 0 && (
                <div className="w-full">
                    <h3>Common Held Items</h3>
                    <div className="grid gap-1">
                        <CommonDataCard
                            data={heldItems.heldItems}
                            total={heldItems.total}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
