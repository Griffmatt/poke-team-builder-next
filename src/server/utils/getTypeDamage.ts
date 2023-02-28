import { type TypeRelations } from "pokenode-ts"

export const getTypeDamage = (typeDamageArr: TypeRelations[]) => {
    const combinedTypeDamage = combineTypeDamage(typeDamageArr)

    const strongAgainstSet = new Set([
        ...combinedTypeDamage.double_damage_to,
        ...combinedTypeDamage.no_damage_from,
    ])
    const doubleDamageFromSet = new Set(combinedTypeDamage.double_damage_from)
    const doubleDamageFromArr = Array.from(doubleDamageFromSet)

    const weakAgainst = [
        ...doubleDamageFromArr.filter(
            (type) => !combinedTypeDamage.half_damage_from.includes(type) && 
            !combinedTypeDamage.no_damage_from.includes(type)
        ),
        ...combinedTypeDamage.no_damage_to,
    ]

    const strongAgainst = Array.from(strongAgainstSet)

    return { strongAgainst: strongAgainst, weakAgainst: weakAgainst }
}

const combineTypeDamage = (typeDamageArr: TypeRelations[]) => {
    const firstTypeDamage = typeDamageArr[0]
    const secondTypeDamage = typeDamageArr[1]

    const typeDamage = {
        double_damage_from: [] as string[],
        half_damage_from: [] as string[],
        no_damage_from: [] as string[],
        double_damage_to: [] as string[],
        half_damage_to: [] as string[],
        no_damage_to: [] as string[],
    }
    let key: keyof TypeRelations

    for (key in typeDamage) {
        typeDamage[key] = firstTypeDamage[key].map((type) => type.name)
    }

    if (secondTypeDamage) {
        for (key in typeDamage) {
            typeDamage[key] = [
                ...typeDamage[key],
                ...secondTypeDamage[key].map((type) => type.name),
            ]
        }
    }

    return typeDamage
}
