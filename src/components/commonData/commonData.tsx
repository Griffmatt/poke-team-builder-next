import { useSelectedContext } from "context/selectedContext"
import { useEffect } from "react"
import { countStringArr } from "server/utils/countStringArr"
import { CreatedPokemon } from "types/trpc"
import { formatPercentage } from "utils/formatPercentage"
import { formatString } from "utils/formatString"

type dataTypes = "nature" | "heldItem" | "ability" | "teraType"

interface Props {
    pokemonBuilds: CreatedPokemon[]
    dataType: dataTypes
}

export const CommonData = ({ pokemonBuilds, dataType }: Props) => {
    const data = pokemonBuilds.map((pokemon) => pokemon?.[dataType])
    const { string, total } = countStringArr(data as string[])
    const formatDataType = (string: dataTypes) => {
        if (string === "teraType") return "Tera Type"
        return formatString(string)
    }

    const { selectedPokemonData, handleChange } = useSelectedContext()

    const type = formatDataType(dataType)
    const selected = selectedPokemonData?.[dataType]

    useEffect(() => {
        handleChange({ [dataType]: string[0].name })
    }, [string[0].name])

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
                            const stringSelected =
                                string.name.toLowerCase() ===
                                selected?.toLowerCase()
                            return (
                                <button
                                    className={`flex justify-between rounded border-2 px-4 py-2  dark:bg-dark-2 ${
                                        stringSelected
                                            ? "border-primary"
                                            : "dark:border-dark-2"
                                    }`}
                                    key={string.name}
                                    onClick={() =>
                                        handleChange({
                                            [dataType]: string.name,
                                        })
                                    }
                                >
                                    <h4>{formatString(string.name)}</h4>
                                    <h5>{percentage}</h5>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
