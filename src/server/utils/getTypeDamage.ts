import { type TypeRelations } from "pokenode-ts"

export const getTypeDamage = (typeDamageArr: TypeRelations[]) => {
    const combinedTypeDamage = combineTypeDamage(typeDamageArr)
    const {
        double_damage_to,
        double_damage_from,
        half_damage_from,
        no_damage_from,
        no_damage_to,
    } = combinedTypeDamage

    const doubleDamageFromArr = [...new Set(double_damage_from)]
    const reducedDamageFrom = [...half_damage_from, ...no_damage_from]

    const weakAgainst = [
        ...doubleDamageFromArr.filter(
            (type) => !reducedDamageFrom.includes(type)
        ),
        ...no_damage_to,
    ]

    const strongAgainst = [...new Set([...double_damage_to, ...no_damage_from])]

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
