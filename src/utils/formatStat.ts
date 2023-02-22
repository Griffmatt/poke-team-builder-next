export const formatStat = (stat: string) => {
    const lowerCase = stat.toLowerCase()
    if (lowerCase === "hp") return "HP"
    if (lowerCase === "attack") return "Att"
    if (lowerCase === "defense") return "Def"
    if (lowerCase === "special-attack") return "SpA"
    if (lowerCase === "special-defense") return "SpD"
    return "Spe"
}
