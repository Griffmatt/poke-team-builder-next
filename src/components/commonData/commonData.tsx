import { useEffect, type Dispatch, type SetStateAction } from "react"
import { countStringArr } from "server/utils/countStringArr"
import { CreatedPokemon } from "types/trpc"
import { formatPercentage } from "utils/formatPercentage"
import { formatString } from "utils/formatString"

type dataTypes = "nature" | "heldItem" | "ability" | "teraType"

interface Props {
    pokemonBuilds: CreatedPokemon[]
    dataType: dataTypes
    selected: string
    setSelected: Dispatch<SetStateAction<string>>
}

export const CommonData = ({ pokemonBuilds, dataType, selected, setSelected }: Props) => {
    const data = pokemonBuilds.map((pokemon) => pokemon?.[dataType])
    const { string, total } = countStringArr(data as string[])
    const formatDataType = (string: dataTypes) => {
        if (string === "teraType") return "Tera Type"
        return formatString(string)
    }

    const type = formatDataType(dataType)

    useEffect(() => {
        setSelected(string[0].name)
    }, [string])

    return (
        <>
            {data.length > 0 && (
                <div className="w-full">
                    <h3>Common {type}</h3>
                    <div className="grid gap-1">
                        {string.slice(0, 6).map((string) => {
                            const percentage = formatPercentage(
                                string.amount / total
                            )
                            const stringSelected = string.name.toLowerCase() === selected.toLowerCase()
                            return (
                                <div
                                    className={`flex justify-between rounded px-4 py-2 dark:bg-dark-2 ${stringSelected && "border-2 border-primary"}`}
                                    key={string.name}
                                >
                                    <h4>{formatString(string.name)}</h4>
                                    <h5>{percentage}</h5>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
