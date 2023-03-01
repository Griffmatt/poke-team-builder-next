import { formatPercentage } from "utils/formatPercentage"
import React, { useEffect, useState } from "react"
import { formatString } from "utils/formatString"
import { api } from "utils/api"
import { countStringArr } from "utils/countStringArr"

type dataTypes = "nature" | "heldItem" | "ability" | "teraType"
interface PokemonValues {
    ability: string
    nature: string
    heldItem: string
    shiny: boolean
    teraType: string
    moves: string[]
}

interface Props {
    dataType: dataTypes
    selected: string
    setData: React.Dispatch<Partial<PokemonValues>>
    items: string[]
    openInput: string
    setOpenInput: React.Dispatch<React.SetStateAction<string>>
    pokemonName: string
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export const DataInput = ({
    dataType,
    selected,
    setData,
    items,
    openInput,
    setOpenInput,
    pokemonName,
}: Props) => {
    const [clicked, setClicked] = useState(0)

    const { data: pokemonBuilds } = api.pokemon.getPokemonBuilds.useQuery({
        pokemonName: pokemonName,
    })

    useEffect(() => {
        setOpenInput("")
    }, [clicked, setOpenInput])

    const handleOpen = (event: ButtonEvent) => {
        event.stopPropagation()
        if (dataType === openInput) {
            setOpenInput("")
            return
        }
        setOpenInput(dataType)
    }

    const dataTypes = {
        nature: "Nature",
        heldItem: "Held Item",
        ability: "Ability",
        teraType: "Tera Type",
    }

    const handleClick = (item: string, event: ButtonEvent) => {
        event.stopPropagation()

        setData({ [dataType]: item })
        setClicked(clicked + 1)
    }

    const dataStringArr = pokemonBuilds?.map(
        (pokemonBuild) => pokemonBuild?.[dataType]
    )
    const commonData = countStringArr(dataStringArr ?? [])
    const commonDataMap = new Map<string, number>()

    commonData.string.forEach((dataName) => {
        commonDataMap.set(dataName.name, dataName.amount)
    })

    const title = dataTypes?.[dataType]
    const isOpen = openInput === dataType

    return (
        <div>
            <h3>{title}</h3>
            <button
                className="flex h-8 w-full items-center justify-between rounded-2xl bg-dark-2 px-4 py-1"
                onClick={handleOpen}
                type="button"
            >
                <div className="flex w-full justify-between align-middle">
                    <h3>{formatString(selected)}</h3>
                    {isOpen ? <p>⌄</p> : <p>^</p>}
                </div>
            </button>
            <div className="relative">
                {isOpen && (
                    <div className="no-scrollbar absolute z-50 h-fit max-h-96 w-full divide-y-2 divide-dark-3 overflow-y-scroll rounded-2xl border-2 border-dark bg-dark-2">
                        {items.map((item) => {
                            const amount = commonDataMap.get(item)
                            const percentage =
                                amount && commonData
                                    ? formatPercentage(
                                          amount / commonData.total
                                      )
                                    : undefined
                            return (
                                <button
                                    key={item}
                                    className="btn-dark-2 top-1 flex h-10 w-full items-center justify-between px-4 py-1 lg:h-8"
                                    type="button"
                                    onClick={(event) =>
                                        handleClick(item, event)
                                    }
                                >
                                    <div className="flex gap-3">
                                        <h3>{formatString(item)}</h3>
                                    </div>
                                    {percentage && <p>{percentage}</p>}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
