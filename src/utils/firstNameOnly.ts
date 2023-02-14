export const firstNameOnly = (name: string | null) => {
    if (name === null) return ""
    return name.split(" ")[0]
}
