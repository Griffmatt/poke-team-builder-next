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

export default function useHandleEvChange(defaultStats?: StatsArr[]) {
    let currentStats = null
    if (defaultStats) {
        currentStats = defaultStats.reduce((statObj, stat) => {
            return { ...statObj, [stat.stat]: stat.value }
        }, {} as Stats)
    }

    const [ivs, setIvs] = useState({
        HP: currentStats?.HP ?? 31,
        Att: currentStats?.Att ?? 31,
        Def: currentStats?.Def ?? 31,
        SpA: currentStats?.SpA ?? 31,
        SpD: currentStats?.SpD ?? 31,
        Spe: currentStats?.Spe ?? 31,
    })

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

    const ivsArr = []

    for (const key in ivs) {
        ivsArr.push({
            stat: key,
            value: ivs[key as keyof Stats],
        })
    }

    return { ivsArr, decreaseIv, increaseIv, handleIvChange }
}
