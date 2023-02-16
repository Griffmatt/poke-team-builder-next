import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "utils/api"
import { ProfileNav } from "components/profile/profileNav"
import React from "react"
import { TeamRows } from "components/teams/teamRows"
import { SkeletonTeamRows } from "components/teams/ui/skeletonTeamRows"
import { useSession } from "next-auth/react"

const ProfileTeams: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const { userId } = router.query

    const {
        data: userData,
        isLoading,
        error,
        isFetching,
    } = api.users.getUser.useQuery(
        { userId: userId as string },
        {
            enabled: session?.user?.id !== userId,
        }
    )

    const {
        data: teams,
        isLoading: isLoading2,
        error: error2,
    } = api.teams.getUserTeams.useQuery({
        userId: userId as string,
    })

    const {
        data: favoriteTeams,
        isLoading: isLoading3,
        error: error3,
    } = api.favorite.checkUserFavoriteTeams.useQuery({
        userId: userId as string,
    })

    const user = userData || isFetching ? userData : session?.user
    if ((isLoading && isFetching) || isLoading2 || isLoading3) {
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
