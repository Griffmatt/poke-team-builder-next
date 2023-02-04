import { countStringArr } from "server/utils/countStringArr"
import { CreatedPokemon } from "types/trpc"
import { CommonDataCard } from "./commonDataCard"

type dataTypes = "nature" | "heldItem" | "ability" | "teraType" 

interface Props {
    pokemonBuilds: CreatedPokemon[]
    dataType: dataTypes
}

export const CommonData = ({ pokemonBuilds, dataType }: Props) => {
    const data = pokemonBuilds.map(pokemon => pokemon?.[dataType])
    const { string, total} = countStringArr(data as string[])
    const formatDataType = (string: dataTypes) => {
        if(string === "nature") return "Nature"
        if(string === "heldItem") return "Held Item"
        if( string === "ability") return "Ability"
        return "Tera Type"
    }

    const type = formatDataType(dataType)


    return (
        <>
            {data.length > 0 && (
                <div className="w-full">
                    <h3>Common {type}</h3>
                    <div className="grid gap-1">
                        <CommonDataCard
                            data={string}
                            total={total}
                        />
                    </div>
                </div>
            )}
        </>
    )
}