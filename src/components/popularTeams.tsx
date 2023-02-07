import { useSession } from "next-auth/react"
import React from "react"
import { api } from "utils/api"
import { TeamRows } from "./teamRows"

export const PopularTeams = () => {
    const { data: session } = useSession()
    const { data: popularTeams, isLoading: teamsLoading } =
        api.teams.recentTeams.useQuery()
    const { data: favorites, isLoading: favoritesLoading } =
        api.favorite.checkUserFavoriteTeams.useQuery({
            userId: session?.user?.id ?? null,
        })

    const isLoading = teamsLoading || favoritesLoading

    return (
        <div className="grid gap-3">
            <h2>Popular Teams</h2>
            {popularTeams && favorites && (
                <TeamRows
                    teams={popularTeams ?? null}
                    favoriteTeams={favorites ?? null}
                    isLoading={isLoading}
                />
            )}
        </div>
    )
}
