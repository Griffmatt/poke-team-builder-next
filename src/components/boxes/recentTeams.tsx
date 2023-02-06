import { TeamRows } from "components/teamRows"
import { useSession } from "next-auth/react"
import React from "react"
import { api } from "utils/api"

export const RecentTeams = () => {
    const { data: session } = useSession()
    const { data: recentTeams } = api.teams.recentTeams.useQuery()
    const { data: favorites } = api.favorite.checkUserFavoriteTeams.useQuery({
        userId: session?.user?.id ?? null,
    })

    return (
        <div className="grid gap-3">
            <h2>Recent Teams</h2>
            {recentTeams && favorites && (
                <TeamRows teams={recentTeams} favoriteTeams={favorites} />
            )}
        </div>
    )
}
