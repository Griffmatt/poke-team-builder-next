import { FavoritedButton } from "components/ui/favoritedButton"
import Link from "next/link"
import React from "react"
import { type teams } from "../../types/trpc"
import { TeamRow } from "./teamRow"
import { TeamsEmpty } from "./ui/teamsEmpty"

interface Props {
    teams: teams
    favoriteTeams?: string[]
    query?: string
    userId?: string
    userName?: string | null
    favoriteRows?: boolean
}

export const TeamRows = ({
    teams,
    favoriteTeams,
    query,
    userId,
    userName,
    favoriteRows,
}: Props) => {
    return (
        <>
            {teams.length === 0 ? (
                <TeamsEmpty
                    query={query}
                    userId={userId}
                    userName={userName}
                    favoriteRows={favoriteRows}
                />
            ) : (
                teams.map((team) => {
                    const favorited = favoriteTeams?.includes(team.id)
                    return (
                        <div className="grid gap-3" key={team.id}>
                            <div className="flex gap-2">
                                <h3>{team.teamName}</h3>
                                {favorited && (
                                    <FavoritedButton
                                        favorited={favorited}
                                        absolute={false}
                                        small={true}
                                        displayOnly={true}
                                    />
                                )}
                            </div>
                            <Link href={`/team/${team.id}`}>
                                <TeamRow
                                    team={team}
                                    withStats={false}
                                    favorite={favorited ?? false}
                                />
                            </Link>
                        </div>
                    )
                })
            )}
        </>
    )
}
