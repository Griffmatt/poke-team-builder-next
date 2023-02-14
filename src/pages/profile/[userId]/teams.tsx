import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "utils/api"
import { ProfileNav } from "components/profile/profileNav"
import React from "react"
import { TeamRows } from "components/teams/teamRows"
import { SkeletonTeamRows } from "components/teams/ui/skeletonTeamRows"

const ProfileTeams: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query

    const {
        data: user,
        isLoading: userLoading,
        error,
    } = api.users.getUser.useQuery({ userId: userId as string })

    const {
        data: teams,
        isLoading: teamsLoading,
        error: error2,
    } = api.teams.getUserTeams.useQuery({
        userId: userId as string,
    })

    const {
        data: favoriteTeams,
        isLoading: favoritesLoading,
        error: error3,
    } = api.favorite.checkUserFavoriteTeams.useQuery({
        userId: userId as string,
    })

    if (userLoading || teamsLoading || favoritesLoading) {
        return (
            <main>
                <ProfileNav
                    selected="teams"
                    userId={userId as string}
                    user={user}
                />
                <div className="grid gap-3">
                    <SkeletonTeamRows />
                </div>
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>
    if (error3) return <div>Error: {error3.message}</div>

    return (
        <main>
            <ProfileNav
                selected="teams"
                userId={userId as string}
                user={user}
            />
            <div className="grid gap-3">
                <TeamRows
                    teams={teams}
                    favoriteTeams={favoriteTeams}
                    userId={user?.id}
                    userName={user?.name}
                />
            </div>
        </main>
    )
}

export default ProfileTeams
