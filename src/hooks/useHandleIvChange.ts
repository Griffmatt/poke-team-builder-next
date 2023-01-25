import { useState } from 'react'

interface IvStats {
    hitpointsIv: number
    attackIv: number
    defenseIv: number
    specialAttackIv: number
    specialDefenseIv: number
    speedIv: number
}

export default function useHandleEvChange(defaultStats?: IvStats) {
    const [ivs, setIvs] = useState({
        hitpointsIv: defaultStats?.hitpointsIv ?? 31,
        attackIv: defaultStats?.attackIv ?? 31,
        defenseIv: defaultStats?.defenseIv ?? 31,
        specialAttackIv: defaultStats?.specialAttackIv ?? 31,
        specialDefenseIv: defaultStats?.specialDefenseIv ?? 31,
        speedIv: defaultStats?.speedIv ?? 31,
    })

    const decreaseIv = (currentStat: string) => {
        if (ivs[currentStat as keyof IvStats] <= 0) return

        setIvs({
            ...ivs,
            [currentStat]: ivs[currentStat as keyof IvStats] - 1,
        })
    }

    const increaseIv = (currentStat: string) => {
        if (ivs[currentStat as keyof IvStats] >= 31) return

        setIvs({
            ...ivs,
            [currentStat]: ivs[currentStat as keyof IvStats] + 1,
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

    return { ivs, decreaseIv, increaseIv, handleIvChange }
}
