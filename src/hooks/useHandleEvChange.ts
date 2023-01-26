import { useState } from 'react'

interface StatsArr {
    stat: string
    value: number
}

interface Stats {
    Hitpoints: number
    Attack: number
    Defense: number
    'Special Attack': number
    'Special Defense': number
    'Speed': number
}

export default function useHandleEvChange(defaultStats?: StatsArr[]) {
    let currentStats = null
    if(defaultStats){
        currentStats = defaultStats.reduce((statObj, stat)=>{
            return {...statObj, [stat.stat]: stat.value}
        }, {} as Stats)
    }
    const [evs, setEvs] = useState({
        Hitpoints: currentStats?.Hitpoints ?? 0,
        Attack: currentStats?.Attack ?? 0,
        Defense: currentStats?.Defense ?? 0,
        'Special Attack': currentStats?.['Special Attack'] ?? 0,
        'Special Defense': currentStats?.['Special Defense'] ?? 0,
        Speed: currentStats?.Speed ?? 0,
    })

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
        for (const stat in evs) {
            total += evs[stat as keyof Stats]
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
        for (const stat in evs) {
            if (stat === currentStat) continue
            total -= evs[stat as keyof Stats]
        }

        if (value > total || value >= 252) {
            setEvs({ ...evs, [currentStat]: Math.min(252, total) })
            return
        }

        setEvs({ ...evs, [currentStat]: value })
    }

    const evsArr = []
    for (const key in evs) {
        evsArr.push({
            stat: key,
            value: evs[key as keyof Stats],
        })
    }

    return { evsArr, decreaseEv, increaseEv, handleEvChange }
}
