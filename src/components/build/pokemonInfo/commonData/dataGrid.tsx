import { useSelectedContext } from "context/selectedContext"
import { Fragment, useEffect } from "react"
import { countStringArr } from "utils/countStringArr"
import { type CreatedPokemon } from "types/trpc"
import { formatPercentage } from "utils/formatPercentage"
import { formatString } from "utils/formatString"
import { api } from "utils/api"

type dataTypes = "nature" | "heldItem" | "ability" | "teraType"

interface Props {
    pokemonBuilds: CreatedPokemon[]
    dataType: dataTypes
}

interface GridProps {
    pokemonName: string
}

export const CommonDataGrid = ({ pokemonName }: GridProps) => {
    const {
        data: pokemonBuilds,
        isLoading,
        error,
    } = api.pokemon.getPokemonBuilds.useQuery({
        pokemonName,
    })

    const dataTypes: dataTypes[] = ["nature", "ability", "teraType", "heldItem"]

    if (isLoading)
        return (
            <div className="grid gap-1 xs:grid-cols-2">
                {dataTypes.map((type) => {
                    return (
                        <Fragment key={type}>
                            <SkeletonDataCards dataType={type} />
                        </Fragment>
                    )
                })}
            </div>
        )

    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="grid gap-1 xs:grid-cols-2">
            {pokemonBuilds.length > 0 ? (
                <>
                    {dataTypes.map((type) => {
                        return (
                            <Fragment key={type}>
                                <CommonData
                                    pokemonBuilds={pokemonBuilds}
                                    dataType={type}
                                />
                            </Fragment>
                        )
                    })}
                </>
            ) : (
                "No Data"
            )}
        </div>
    )
}

export const CommonData = ({ pokemonBuilds, dataType }: Props) => {
    const data = pokemonBuilds.map((pokemon) => pokemon?.[dataType])
    const { string, total } = countStringArr(data)
    const formatDataType = (string: dataTypes) => {
        if (string === "teraType") return "Tera Type"
        if (string === "heldItem") return "Held Item"
        return formatString(string)
    }

    const { selectedPokemonData, handleChange } = useSelectedContext()

    const type = formatDataType(dataType)
    const selected = selectedPokemonData?.[dataType]

    const firstInData = string[0].name

    useEffect(() => {
        handleChange({ [dataType]: firstInData })
    }, [dataType, firstInData, handleChange])

    return (
        <>
            {data.length > 0 && (
                <div>
                    <h3>{type}</h3>
                    <div className="grid gap-1">
                        {string.slice(0, 4).map((string) => {
                            const percentage = formatPercentage(
                                string.amount / total
                            )
                            const stringSelected =
                                string.name.toLowerCase() ===
                                selected?.toLowerCase()
                            return (
                                <button
                                    className={`flex items-center justify-between rounded border-2 bg-dark-2 px-4  py-2 ${
                                        stringSelected
                                            ? "border-primary"
                                            : "border-dark-2"
                                    }`}
                                    key={string.name}
                                    onClick={() =>
                                        handleChange({
                                            [dataType]: string.name,
                                        })
                                    }
                                >
                                    <h4>{formatString(string.name)}</h4>
                                    <p>{percentage}</p>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

interface SkeletonProps {
    dataType: dataTypes
}

const SkeletonDataCards = ({ dataType }: SkeletonProps) => {
    const formatDataType = (string: dataTypes) => {
        if (string === "teraType") return "Tera Type"
        if (string === "heldItem") return "Held Item"
        return formatString(string)
    }
    const fillerArr = Array.from({ length: 4 }, () => 0)

    const type = formatDataType(dataType)

    return (
        <div>
            <h3>{type}</h3>
            <div className="grid gap-1">
                {fillerArr.map((_, index) => {
                    return (
                        <button
                            className="flex animate-pulse items-center justify-between rounded border-2 border-dark-2 bg-dark-2 px-4 py-2"
                            key={index}
                        >
                            <h4 className="text-transparent">x</h4>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
