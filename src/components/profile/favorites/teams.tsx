import { TeamRows } from "components/teams/teamRows"
import { SkeletonTeamRows } from "components/teams/ui/skeletonTeamRows"
import { useRouter } from "next/router"
import React from "react"
import { api } from "utils/api"

export const FavoriteTeams = () => {
    const router = useRouter()
    const { userId } = router.query

    const {
        data: teams,
        isLoading,
        error,
    } = api.favorite.getUserFavoriteTeams.useQuery({
        userId: userId as string,
    })

    const {
        data: favoriteTeams,
        isLoading: isLoading2,
        error: error2,
    } = api.favorite.checkUserFavoriteTeams.useQuery({
        userId: userId as string,
    })
    if (isLoading || isLoading2) {
        return (
            <section className="grid gap-3">
                <h2>Teams</h2>
                <SkeletonTeamRows />
            </section>
        )
    }

    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>

    return (
        <section className="grid gap-3">
            <h2>Teams</h2>
            <TeamRows
                teams={teams}
                favoriteTeams={favoriteTeams}
                favoriteRows={true}
                userId={userId as string}
            />
        </section>
    )
}
