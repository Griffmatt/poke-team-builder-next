import { TeamRows } from "components/teams/teamRows"
import { SkeletonTeamRows } from "components/teams/ui/skeletonTeamRows"
import { useSession } from "next-auth/react"
import { api } from "utils/api"

export const RecentTeams = () => {
    const { data: session } = useSession()

    const { data: teams, isLoading, error } = api.teams.recentTeams.useQuery()

    const {
        data: favorites,
        isLoading: isLoading2,
        error: error2,
        isFetching,
    } = api.favorite.checkUserFavoriteTeams.useQuery(
        {
            userId: session?.user?.id as string,
        },
        { enabled: !!session?.user?.id }
    )

    if (isLoading || (isLoading2 && isFetching)) {
        return (
            <section className="grid gap-3" aria-label="Loading">
                <h2>Recent Teams</h2>
                <SkeletonTeamRows />
            </section>
        )
    }
    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>

    return (
        <section className="grid gap-3">
            <h2>Recent Teams</h2>
            <TeamRows teams={teams} favoriteTeams={favorites} />
        </section>
    )
}
