import { useState } from "react"

interface StatsArr {
    stat: string
    value: number
}

interface Stats {
    HP: number
    Att: number
    Def: number
    SpA: number
    SpD: number
    Spe: number
}

export default function useHandleEvChange(currentStats?: StatsArr[]) {
    const [ivs, setIvs] = useState(getInitialIvs(currentStats))

    //potential bug setting ivs using string instead of partial keyof Stats allows anything to be used as input
    const decreaseIv = (currentStat: string) => {
        if (!(currentStat in ivs)) return
        const currentValue = ivs[currentStat as keyof Stats]

        if (currentValue <= 0) return

        setIvs({
            ...ivs,
            [currentStat]: currentValue - 1,
        })
    }

    const increaseIv = (currentStat: string) => {
        if (!(currentStat in ivs)) return
        const currentValue = ivs[currentStat as keyof Stats]

        if (currentValue >= 31) return

        setIvs({
            ...ivs,
            [currentStat]: currentValue + 1,
        })
    }

    const handleIvChange = (value: number, currentStat: string) => {
        if (!(currentStat in ivs)) return
        if (isNaN(value)) return
        if (value > 31) {
            setIvs({
                ...ivs,
                [currentStat]: 31,
            })

            return
        }

        if (value < 0) {
            setIvs({
                ...ivs,
                [currentStat]: 0,
            })

            return
        }

        setIvs({ ...ivs, [currentStat]: value })
    }

    const ivsArr: StatsArr[] = []

    for (const [stat, value] of Object.entries(ivs)) {
        ivsArr.push({
            stat: stat,
            value: value,
        })
    }

    return { ivsArr, decreaseIv, increaseIv, handleIvChange }
}

const getInitialIvs = (currentStats?: StatsArr[]) => {
    const defaultStats = {
        HP: 31,
        Att: 31,
        Def: 31,
        SpA: 31,
        SpD: 31,
        Spe: 31,
    }

    const currentStatsObj = currentStats?.reduce((statObj, { stat, value }) => {
        return { ...statObj, [stat]: value }
    }, defaultStats)

    return currentStatsObj ?? defaultStats
}
