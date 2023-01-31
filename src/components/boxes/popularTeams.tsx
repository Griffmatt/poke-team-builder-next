import React from "react"
import { api } from "../../utils/api"
import { TeamRows } from "../teamRows"

const PopularTeams = () => {
    const { data: popularTeams } = api.statistics.getPopularTeams.useQuery()

    return (
        <div className="grid gap-3">
            <h2>Popular Teams</h2>
            {popularTeams && <TeamRows teams={popularTeams} />}
        </div>
    )
}

export { PopularTeams }
