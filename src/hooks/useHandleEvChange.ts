import { useState } from 'react'

interface EvStats {
    hitpointsEv: number
    attackEv: number
    defenseEv: number
    specialAttackEv: number
    specialDefenseEv: number
    speedEv: number
}

export default function useHandleEvChange(defaultStats?: EvStats) {
    const [evs, setEvs] = useState({
        hitpointsEv: defaultStats?.hitpointsEv ?? 0,
        attackEv: defaultStats?.attackEv ?? 0,
        defenseEv: defaultStats?.defenseEv ?? 0,
        specialAttackEv: defaultStats?.specialAttackEv ?? 0,
        specialDefenseEv: defaultStats?.specialDefenseEv ?? 0,
        speedEv: defaultStats?.speedEv ?? 0,
    })

    const decreaseEv = (currentStat: string) => {
        if (evs[currentStat as keyof EvStats] <= 0) return

        setEvs({
            ...evs,
            [currentStat]:
                evs[currentStat as keyof EvStats] -
                (evs[currentStat as keyof EvStats] % 4 || 4),
        })
    }

    const increaseEv = (currentStat: string) => {
        let total = 4
        for (const stat in evs) {
            total += evs[stat as keyof EvStats]
        }
        if (total > 511 || evs[currentStat as keyof EvStats] + 4 > 255) return
        setEvs({
            ...evs,
            [currentStat]:
                evs[currentStat as keyof EvStats] +
                (4 - (evs[currentStat as keyof EvStats] % 4)),
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
            total -= evs[stat as keyof EvStats]
        }

        if (value > total || value >= 252) {
            setEvs({ ...evs, [currentStat]: Math.min(252, total) })
            return
        }

        setEvs({ ...evs, [currentStat]: value })
    }

    return { evs, decreaseEv, increaseEv, handleEvChange }
}
