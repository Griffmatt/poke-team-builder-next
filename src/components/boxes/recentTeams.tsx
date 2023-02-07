import { TeamRows } from "components/teamRows"
import { useSession } from "next-auth/react"
import React from "react"
import { api } from "utils/api"

export const RecentTeams = () => {
    const { data: session } = useSession()
    const { data: recentTeams, isLoading: teamsLoading } =
        api.teams.recentTeams.useQuery()
    const { data: favorites, isLoading: favoritesLoading } =
        api.favorite.checkUserFavoriteTeams.useQuery({
            userId: session?.user?.id ?? null,
        })

    const isLoading = teamsLoading || favoritesLoading

    return (
        <div className="grid gap-3">
            <h2>Recent Teams</h2>
            <TeamRows
                teams={recentTeams ?? null}
                favoriteTeams={favorites ?? null}
                isLoading={isLoading}
            />
        </div>
    )
}
