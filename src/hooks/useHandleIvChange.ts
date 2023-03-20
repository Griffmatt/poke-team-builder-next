import { useState } from "react"

interface StatsArr {
    stat: string
    value: number
}

export default function useHandleEvChange(currentStats?: StatsArr[]) {
    const [ivs, setIvs] = useState(getInitialIvs(currentStats))

    //potential bug setting ivs using string instead of partial keyof Stats allows anything to be used as input
    const decreaseIv = (currentStat: string) => {
        const currentValue = ivs.get(currentStat)
        if (currentValue === undefined) return
        if (currentValue <= 0) return

        const newValue = currentValue - 1
        setIvs((map) => new Map(map.set(currentStat, newValue)))
    }

    const increaseIv = (currentStat: string) => {
        const currentValue = ivs.get(currentStat)
        if (currentValue === undefined) return
        if (currentValue >= 31) return

        const newValue = currentValue + 1
        setIvs((map) => new Map(map.set(currentStat, newValue)))
    }

    const handleIvChange = (value: number, currentStat: string) => {
        const currentValue = ivs.get(currentStat)
        if (currentValue === undefined) return
        if (isNaN(value)) return
        if (value > 31) {
            setIvs((map) => new Map(map.set(currentStat, 31)))
            return
        }

        if (value < 0) {
            setIvs({
                ...ivs,
                [currentStat]: 0,
            })

            return
        }

        setIvs((map) => new Map(map.set(currentStat, value)))
    }

    const ivsArr: StatsArr[] = []

    for (const [stat, value] of ivs) {
        ivsArr.push({
            stat: stat,
            value: value,
        })
    }

    return { ivsArr, decreaseIv, increaseIv, handleIvChange }
}

const getInitialIvs = (currentStats?: StatsArr[]) => {
    const defaultStats = Object.entries({
        HP: 31,
        Att: 31,
        Def: 31,
        SpA: 31,
        SpD: 31,
    })

    const statsMap = new Map(defaultStats)

    currentStats?.forEach(({ stat, value }) => {
        statsMap.set(stat, value)
    })
    return statsMap
}
