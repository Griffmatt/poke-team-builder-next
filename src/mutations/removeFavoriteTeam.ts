import { api } from "utils/api"
import { sortByFavorited } from "utils/sortByFavorited"

export const removeFavoriteTeamMutation = (teamId: string, userId: string) => {
    const apiContext = api.useContext()
    const removeFavoriteTeam = api.favorite.unfavoriteTeam.useMutation({
        onMutate: () => {
            const usersFavorites =
                apiContext.favorite.checkUserFavoriteTeams.getData({
                    userId: userId,
                })

            const usersTeams = apiContext.teams.getUserTeams.getData({
                userId: userId,
            })

            if (usersFavorites) {
                apiContext.favorite.checkUserFavoriteTeams.setData(
                    {
                        userId: userId,
                    },
                    usersFavorites.filter((team) => team !== teamId)
                )
            }

            if (usersTeams) {
                const mappedTeams = usersTeams.map((team) => {
                    if (team.id === teamId) {
                        return { ...team, favorited: [] }
                    }
                    return team
                })
                const sortedByFavorited = sortByFavorited(mappedTeams)
                apiContext.teams.getUserTeams.setData(
                    {
                        userId: userId,
                    },
                    sortedByFavorited
                )
            }

            return { usersFavorites, usersTeams }
        },
        onError: (error, variables, context) => {
            apiContext.favorite.checkUserFavoriteTeams.setData(
                {
                    userId: userId,
                },
                context?.usersFavorites
            )

            apiContext.teams.getUserTeams.setData(
                {
                    userId: userId,
                },
                context?.usersTeams
            )
        },
        onSettled: () => {
            apiContext.favorite.checkUserFavoriteTeams.invalidate()
            apiContext.teams.getUserTeams.invalidate()
        },
    })
    return removeFavoriteTeam
}
