import { userPokemonArr, userTeamArr } from "server/utils/includeConfigs"

type Arr = userPokemonArr | userTeamArr

type ArrType<T> =
  T extends userPokemonArr ? userPokemonArr :
  T extends userTeamArr ? userTeamArr :
  never;

const sortByFavorited = <T extends Arr>(arr: T): ArrType<T> => {
    const sorted = arr.sort((a, b) => {
        const y = b.favorited[0]?.favoritedAt
            ? Number(b.favorited[0]?.favoritedAt)
            : 1
        const x = a.favorited[0]?.favoritedAt
            ? Number(a.favorited[0]?.favoritedAt)
            : 1
        if (x === y) {
            return b.createdAt.getTime() - a.createdAt.getTime()
        }
        return y - x
    })

    return sorted as ArrType<T>

}

export { sortByFavorited }
