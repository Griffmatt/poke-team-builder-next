export const countStringArr = (stringArr: string[]) => {
    const stringMap = new Map<string, number>()
    let stringCounted = [] as { name: string; amount: number }[]
    stringArr?.forEach((string) => {
        const stringValue = stringMap.get(string)
        stringMap.set(string, (stringValue ?? 0) + 1)
    })

    stringMap.forEach((value, key) => {
        stringCounted = [...stringCounted, { name: key, amount: value }]
    })

    const total = stringCounted.reduce((a, b) => a + b.amount, 0)
    const string = stringCounted.sort((a, b) => {
        if (b.amount === a.amount) {
            const sortName = [a.name, b.name].sort()
            if (sortName[0] === b.name) return 1
            return -1
        }
        return b.amount - a.amount
    })

    return { string, total }
}
