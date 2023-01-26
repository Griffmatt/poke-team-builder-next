import { useState } from "react"

interface StatsArr {
    stat: string
    value: number
}

interface Stats {
    Hitpoints: number
    Attack: number
    Defense: number
    "Special Attack": number
    "Special Defense": number
    Speed: number
}

export default function useHandleEvChange(defaultStats?: StatsArr[]) {
    let currentStats = null
    if (defaultStats) {
        currentStats = defaultStats.reduce((statObj, stat) => {
            return { ...statObj, [stat.stat]: stat.value }
        }, {} as Stats)
    }

    const [ivs, setIvs] = useState({
        Hitpoints: currentStats?.Hitpoints ?? 31,
        Attack: currentStats?.Attack ?? 31,
        Defense: currentStats?.Defense ?? 31,
        "Special Attack": currentStats?.["Special Attack"] ?? 31,
        "Special Defense": currentStats?.["Special Defense"] ?? 31,
        Speed: currentStats?.Speed ?? 31,
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
