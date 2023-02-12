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

            const userFavoritedTeams =
                apiContext.favorite.getUserFavoriteTeams.getData({
                    userId: userId,
                })

                if(userFavoritedTeams){
                    const filterTeams = userFavoritedTeams.filter(team => team.id !== teamId)
                    apiContext.favorite.getUserFavoriteTeams.setData({
                        userId: userId,
                    }, 
                        filterTeams
                    )
                }

            return { usersFavorites, usersTeams, userFavoritedTeams }
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

            apiContext.favorite.getUserFavoriteTeams.setData({
                userId: userId,
            }, 
                context?.userFavoritedTeams
            )
        },
        onSettled: () => {
            apiContext.favorite.checkUserFavoriteTeams.invalidate()
            apiContext.teams.getUserTeams.invalidate()
            apiContext.favorite.getUserFavoriteTeams.invalidate()
        },
    })
    return removeFavoriteTeam
}
