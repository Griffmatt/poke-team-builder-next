import { api } from "../utils/api"
import router from "next/router"
import { team } from "types/trpc"

export const buildTeamMutation = (userId: string, team: NonNullable<team>) => {
    const apiContext = api.useContext()

    const buildTeam = api.teams.buildTeam.useMutation({
        onMutate: async () => {
            const pastTeams = apiContext.teams.getUserTeams.getData({
                userId: userId,
            })

            if (pastTeams) {
                apiContext.teams.getUserTeams.setData({ userId: userId }, [
                    ...pastTeams,
                    team,
                ])
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

    return buildTeam
}
