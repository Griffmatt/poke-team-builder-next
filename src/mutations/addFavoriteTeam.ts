import { api } from "utils/api"
import { team } from "types/trpc"

export const addFavoriteTeamMutation = (teamId: string, userId: string, teamData?: team | null) => {
    const apiContext = api.useContext()
const addFavoriteTeam = api.favorite.favoriteTeam.useMutation({
    onMutate: () => {
        const usersFavorites =
            apiContext.favorite.checkUserFavoriteTeams.getData({
                userId: userId,
            })

        const usersTeams = apiContext.teams.getUserTeams.getData({
            userId: userId,
        })

        if (usersTeams && teamData) {
            const filteredTeams = usersTeams.filter(
                (team) => team.id !== teamId
            )
            apiContext.teams.getUserTeams.setData(
                {
                    userId: userId,
                },
                [teamData, ...filteredTeams]
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

return addFavoriteTeam

}