import {
    type userPokemonArr,
    type userTeamArr,
} from "server/utils/includeConfigs"
import { type formatTeams } from "server/utils/formatTeams"
import { type formattedTeam } from "types/trpc"

type Arr = userPokemonArr | userTeamArr | formattedTeam

type ArrType<T> = T extends userPokemonArr
    ? userPokemonArr
    : T extends userTeamArr
    ? userTeamArr
    : ReturnType<typeof formatTeams>

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
