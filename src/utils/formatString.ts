export const formatString = (string: string) => {
    const capitalizeFirstLetter = string.charAt(0).toUpperCase()
    const restOfString = string.slice(1)
    const replaceDashes = restOfString.replace("-", " ")
    const combineString = `${capitalizeFirstLetter}${replaceDashes}`

    return combineString
}