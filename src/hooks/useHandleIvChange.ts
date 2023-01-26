import { useState } from 'react'

interface Stats {
    Hitpoints: number
    Attack: number
    Defense: number
    'Special Attack': number
    'Special Defense': number
    Speed: number
}

export default function useHandleEvChange(defaultStats?: Stats) {
    const [ivs, setIvs] = useState({
        Hitpoints: defaultStats?.Hitpoints ?? 31,
        Attack: defaultStats?.Attack ?? 31,
        Defense: defaultStats?.Defense ?? 31,
        'Special Attack': defaultStats?.['Special Attack'] ?? 31,
        'Special Defense': defaultStats?.['Special Defense'] ?? 31,
        Speed: defaultStats?.Speed ?? 31,
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
