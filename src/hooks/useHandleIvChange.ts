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
    let defaultStats = {
        HP: 31,
        Att: 31,
        Def: 31,
        SpA: 31,
        SpD: 31,
        Spe: 31,
    }
    if (currentStats) {
        defaultStats = currentStats.reduce((statObj, stat) => {
            return { ...statObj, [stat.stat]: stat.value }
        }, {} as Stats)
    }

    const [ivs, setIvs] = useState(defaultStats)

    const decreaseIv = (currentStat: string) => {
        if (ivs[currentStat as keyof Stats] <= 0) return

        setIvs({
            ...ivs,
            [currentStat]: ivs[currentStat as keyof Stats] - 1,
        })
    }

    const increaseIv = (currentStat: string) => {
        if (ivs[currentStat as keyof Stats] >= 31) return

        setIvs({
            ...ivs,
            [currentStat]: ivs[currentStat as keyof Stats] + 1,
        })
    }

    const handleIvChange = (value: number, currentStat: string) => {
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
