import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "utils/api"
import { ProfileNav } from "components/profile/profileNav"
import Link from "next/link"
import { useSession } from "next-auth/react"
import React from "react"
import { TeamRows } from "components/teamRows"

const ProfileTeams: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query

    const { data: user } = api.users.getUser.useQuery({
        userId: userId as string,
    })

    const { data: teams, isLoading: teamsLoading } =
        api.teams.getUserTeams.useQuery({
            userId: userId as string,
        })

    const { data: favoriteTeams, isLoading: favoritesLoading } =
        api.favorite.checkUserFavoriteTeams.useQuery({
            userId: userId as string,
        })

    const isLoading = teamsLoading || favoritesLoading

    return (
        <main>
            <ProfileNav
                selected="teams"
                userId={userId as string}
                user={user}
            />
            <div className="grid gap-3">
                {teams?.length === 0 && !isLoading ? (
                    <TeamsEmpty userId={user?.id} userName={user?.name} />
                ) : (
                    <TeamRows
                        teams={teams ?? null}
                        favoriteTeams={favoriteTeams ?? null}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </main>
    )
}

export default ProfileTeams

const TeamsEmpty = ({
    query,
    userId,
    userName,
}: {
    query?: string
    userId?: string
    userName?: string | null
}) => {
    const { data: session } = useSession()
    const className =
        "mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl p-6 text-center dark:bg-dark-2"
    if (query) {
        return (
            <div className={className}>
                <h2>There were no results for your query</h2>
                <h3>{query}</h3>
            </div>
        )
    }

    if (userId === session?.user?.id) {
        return (
            <div className={className}>
                <h2>You haven't created any Teams yet!</h2>
                <Link href="/build/teams">
                    Click here to view pokemon to create
                </Link>
            </div>
        )
    }

    return (
        <div className={className}>
            <h2>{userName} hasn't created any Teams yet!</h2>
        </div>
    )
}
