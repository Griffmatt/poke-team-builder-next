import { api } from "../utils/api"
import router from "next/router"
import { type team } from "types/trpc"

export const buildTeamMutation = (userId: string, team: NonNullable<team>) => {
    const apiContext = api.useContext()

    const buildTeam = api.teams.buildTeam.useMutation({
        onMutate: () => {
            const pastTeams = apiContext.teams.getUserTeams.getData({
                userId: userId,
            })

            if (pastTeams) {
                apiContext.teams.getUserTeams.setData({ userId: userId }, [
                   team, 
                    ...pastTeams,
                ])
            }
            return { pastTeams }
        },
        onSuccess: () => {
            void router.push(`/profile/${userId}/teams`)
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
            void apiContext.teams.getUserTeams.invalidate({ userId: userId })
        },
    })

    return buildTeam
}
