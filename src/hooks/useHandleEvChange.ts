import { useState } from 'react'

interface Stats {
    Hitpoints: number
    Attack: number
    Defense: number
    'Special Attack': number
    'Special Defense': number
    'Speed': number
}

export default function useHandleEvChange(defaultStats?: Stats) {
    const [evs, setEvs] = useState({
        Hitpoints: defaultStats?.Hitpoints ?? 0,
        Attack: defaultStats?.Attack ?? 0,
        Defense: defaultStats?.Defense ?? 0,
        'Special Attack': defaultStats?.['Special Attack'] ?? 0,
        'Special Defense': defaultStats?.['Special Defense'] ?? 0,
        Speed: defaultStats?.Speed ?? 0,
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
