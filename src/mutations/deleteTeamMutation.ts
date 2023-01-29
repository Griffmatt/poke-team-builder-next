import { api } from "../utils/api"
import router from "next/router"


export const deleteTeamMutation = (userId: string, teamId: string) => {
    const apiContext = api.useContext()
    const deleteTeam = api.teams.deleteTeam.useMutation({
        onMutate: async () => {

            const pastTeams = apiContext.teams.getUserTeams.getData({
                userId: userId,
            })

            if (pastTeams) {
                apiContext.teams.getUserTeams.setData(
                    { userId: userId },
                    pastTeams.filter((team) => {
                        return team.id !== teamId
                    })
                )
            }
            return { pastTeams }
        },
        onSuccess: () => {
            router.push(`/profile/${userId}/teams`)
        },
        onError: (error, variables, context) => {
            if (context?.pastTeams) {
                apiContext.teams.getUserTeams.setData(
                    { userId: userId },
                    context.pastTeams
                )
            }
        },
        onSettled: () => {
            apiContext.teams.getUserTeams.invalidate({ userId: userId })
        },
    })
    return deleteTeam
}
