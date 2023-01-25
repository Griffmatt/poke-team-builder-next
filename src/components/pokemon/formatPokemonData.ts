import { useSession } from "next-auth/react"

interface EvStats {
    hitpointsEv: number
    attackEv: number
    defenseEv: number
    specialAttackEv: number
    specialDefenseEv: number
    speedEv: number
}

interface IvStats {
    hitpointsIv: number
    attackIv: number
    defenseIv: number
    specialAttackIv: number
    specialDefenseIv: number
    speedIv: number
}

interface Params{
    pokemonName: string
    ability: string
    nature: string
    heldItem: string
    firstMove: string
    secondMove: string
    thirdMove: string
    fourthMove: string
    ivs: IvStats
    evs: EvStats
}

const formatPokemonData = ({pokemonName, ability, nature, heldItem, firstMove, secondMove, thirdMove, fourthMove, ivs, evs}: Params) => {
    const { data: session} = useSession()
    const statsArr = []
        for (const key in evs) {
            statsArr.push({
                stat: key,
                value: evs[key as keyof EvStats],
            })
        }
        for (const key in ivs) {
            statsArr.push({
                stat: key,
                value: ivs[key as keyof IvStats],
            })
        }

    const pokemonData = {
        userId: session?.user?.id as string,
        name: pokemonName,
        ability: ability,
        nature: nature,
        heldItem: heldItem,
        moves: {
            createMany: {
                data: [
                    { move: firstMove, moveOrder: 1 },
                    { move: secondMove, moveOrder: 2 },
                    { move: thirdMove, moveOrder: 3 },
                    { move: fourthMove, moveOrder: 4 },
                ],
            },
        },
        stats: { createMany: { data: statsArr } },
    } 

    return pokemonData
}

export default formatPokemonData