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
        HP: 0,
        Att: 0,
        Def: 0,
        SpA: 0,
        SpD: 0,
        Spe: 0,
    }
    if (currentStats) {
        defaultStats = currentStats.reduce((statObj, stat) => {
            return { ...statObj, [stat.stat]: stat.value }
        }, {} as Stats)
    }
    const [evs, setEvs] = useState(defaultStats)

    const decreaseEv = (currentStat: string) => {
        if (evs[currentStat as keyof Stats] <= 0) return

        setEvs({
            ...evs,
            [currentStat]:
                evs[currentStat as keyof Stats] -
                (evs[currentStat as keyof Stats] % 4 || 4),
        })
    }

    const increaseEv = (currentStat: string) => {
        let total = 4
        for (const stat of Object.values(evs)) {
            total += stat
        }
        if (total > 511 || evs[currentStat as keyof Stats] + 4 > 255) return
        setEvs({
            ...evs,
            [currentStat]:
                evs[currentStat as keyof Stats] +
                (4 - (evs[currentStat as keyof Stats] % 4)),
        })
    }

    const handleEvChange = (value: number, currentStat: string) => {
        if (isNaN(value)) return
        let total = 510
        if (value < 0) {
            setEvs({ ...evs, [currentStat]: 0 })
            return
        }
        //sets total to the max amount that the stat can be
        for (const [stat, value] of Object.entries(evs)) {
            if (stat === currentStat) continue
            total -= value
        }

        if (value > total || value >= 252) {
            setEvs({ ...evs, [currentStat]: Math.min(252, total) })
            return
        }

        setEvs({ ...evs, [currentStat]: value })
    }

    const evsArr: StatsArr[] = []
    for (const [stat, value] of Object.entries(evs)) {
        evsArr.push({
            stat: stat,
            value: value,
        })
    }

    return { evsArr, decreaseEv, increaseEv, handleEvChange }
}
