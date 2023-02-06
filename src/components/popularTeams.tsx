import { useSession } from "next-auth/react"
import React from "react"
import { api } from "utils/api"
import { TeamRows } from "./teamRows"

export const PopularTeams = () => {
    const { data: session } = useSession()
    const { data: popularTeams } = api.statistics.getPopularTeams.useQuery()
    const { data: favorites } = api.favorite.checkUserFavoriteTeams.useQuery({
        userId: session?.user?.id ?? null,
    })

    return (
        <div className="grid gap-3">
            <h2>Popular Teams</h2>
            {popularTeams && favorites && (
                <TeamRows teams={popularTeams} favoriteTeams={favorites} />
            )}
        </div>
    )
}
