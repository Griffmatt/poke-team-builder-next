export const formatStat = (stat: string) => {
    const lowerCase = stat.toLowerCase()
    if (lowerCase === "hp") return "hp"
    if (lowerCase === "attack") return "att"
    if (lowerCase === "defense") return "def"
    if (lowerCase === "special-attack") return "spa"
    if (lowerCase === "special-defense") return "spd"
    return "spe"
}
