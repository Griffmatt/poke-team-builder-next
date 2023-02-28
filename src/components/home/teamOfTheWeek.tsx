import { TeamRows } from "components/teams/teamRows"
import { SkeletonTeamRows } from "components/teams/ui/skeletonTeamRows"
import { api } from "utils/api"

export const TeamOfTheWeek = () => {
    const { data: team, isLoading, error } = api.teams.teamOfTheWeek.useQuery()

    if (isLoading)
        return (
            <section className="grid gap-3">
                <h2>Team of the Week</h2>
                <SkeletonTeamRows rows={1} />
            </section>
        )

    if (error) return <div>Error: {error.message}</div>

    return (
        <section className="grid gap-3">
            <h2>Team of the Week</h2>
            <TeamRows teams={team} />
        </section>
    )
}
