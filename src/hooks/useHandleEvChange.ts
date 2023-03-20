import { useState } from "react"

interface StatsArr {
    stat: string
    value: number
}

export default function useHandleEvChange(currentStats?: StatsArr[]) {
    const [evs, setEvs] = useState(getInitialEvs(currentStats))

    //potential bug setting evs using string instead of partial keyof Stats allows anything to be used as input
    const decreaseEv = (currentStat: string) => {
        const currentValue = evs.get(currentStat)
        if (currentValue === undefined) return
        if (currentValue <= 0) return

        const newValue = currentValue - (currentValue % 4 || 4)
        setEvs((map) => new Map(map.set(currentStat, newValue)))
    }

    const increaseEv = (currentStat: string) => {
        const currentValue = evs.get(currentStat)
        if (currentValue === undefined) return

        let total = 4

        for (const stat of Object.values(evs)) {
            total += stat
        }
        if (total > 511 || currentValue + 4 > 255) return
        const newValue = currentValue + (4 - (currentValue % 4))
        setEvs((map) => new Map(map.set(currentStat, newValue)))
    }

    const handleEvChange = (value: number, currentStat: string) => {
        const currentValue = evs.get(currentStat)
        if (currentValue === undefined) return
        if (isNaN(value)) return
        let total = 510
        if (value < 0) {
            setEvs((map) => new Map(map.set(currentStat, 0)))
            return
        }
        //sets total to the max amount that the stat can be
        for (const [stat, value] of evs) {
            if (stat === currentStat) continue
            total -= value
        }

        if (value > total || value >= 252) {
            const newValue = Math.min(252, total)
            setEvs((map) => new Map(map.set(currentStat, newValue)))
            return
        }
        setEvs((map) => new Map(map.set(currentStat, value)))
    }

    const evsArr: StatsArr[] = []
    for (const [key, value] of evs) {
        evsArr.push({
            stat: key,
            value: value,
        })
    }

    return { evsArr, decreaseEv, increaseEv, handleEvChange }
}

const getInitialEvs = (currentStats?: StatsArr[]) => {
    const defaultStats = Object.entries({
        HP: 0,
        Att: 0,
        Def: 0,
        SpA: 0,
        SpD: 0,
    })

    const statsMap = new Map(defaultStats)

    currentStats?.forEach(({ stat, value }) => {
        statsMap.set(stat, value)
    })
    return statsMap
}
