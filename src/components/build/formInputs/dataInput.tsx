import Image from "next/image"
import { formatPercentage } from "utils/formatPercentage"
import React, { useEffect, useState } from "react"
import { formatString } from "utils/formatString"

interface PokemonValues {
    ability: string
    nature: string
    heldItem: string
    shiny: boolean
    teraType: string
    moves: string[]
}

interface Props {
    dataType: string
    data: string
    setData: React.Dispatch<Partial<PokemonValues>>
    total: number
    items: string[]
    image?: string
    openInput: string
    setOpenInput: React.Dispatch<React.SetStateAction<string>>
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export const DataInput = ({
    dataType,
    data,
    setData,
    total,
    items,
    image,
    openInput,
    setOpenInput,
}: Props) => {
    const percentage = formatPercentage(total)
    const [clicked, setClicked] = useState(0)

    const handleOpen = (event: ButtonEvent) => {
        event.stopPropagation()
        if (dataType === openInput) {
            setOpenInput("")
            return
        }
        setOpenInput(dataType)
    }

    const handleClick = (item: string, event: ButtonEvent) => {
        event.stopPropagation()
        const formatDataType = () => {
            if (dataType === "tera-type") return "teraType"
            if (dataType === "held-item") return "heldItem"
            return dataType
        }
        setData({ [formatDataType()]: item })
        setClicked(clicked + 1)
    }

    useEffect(() => {
        setOpenInput("")
    }, [clicked, setOpenInput])

    return (
        <div className="grid">
            <h3>{formatString(dataType)}</h3>
            <button
                className="flex h-8 w-full justify-between rounded-2xl px-4 py-1 dark:bg-dark-2"
                onClick={handleOpen}
                type="button"
            >
                <div className="flex gap-3">
                    <h4>{formatString(data)}</h4>
                    {image && (
                        <Image src={image} alt={data} height={24} width={24} />
                    )}
                </div>
                <h4>{percentage}</h4>
            </button>
            <div className="relative">
                {openInput === dataType && (
                    <div className="no-scrollbar absolute top-1 z-50 h-fit max-h-96 w-full overflow-y-scroll rounded-2xl">
                        {items.map((item, index) => {
                            const length = items.length - 1
                            const extraBorder =
                                index === 0
                                    ? "border-t-2 rounded-t-2xl"
                                    : index === length
                                    ? "border-b-2 rounded-b-2xl"
                                    : ""
                            return (
                                <button
                                    key={item}
                                    className={` ${extraBorder} btn-dark-2 flex h-10 w-full justify-between border-l-2 border-r-2 border-dark px-4 py-1 lg:h-8`}
                                    type="button"
                                    onClick={(event) =>
                                        handleClick(item, event)
                                    }
                                >
                                    <div className="flex gap-3">
                                        <h4>{formatString(item)}</h4>
                                        {image && (
                                            <Image
                                                src={image}
                                                alt={item}
                                                height={24}
                                                width={24}
                                            />
                                        )}
                                    </div>
                                    <h4>{percentage}</h4>
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
