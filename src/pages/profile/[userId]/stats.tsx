import { type NextPage } from "next"
import { ProfileNav } from "components/profile/profileNav"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { api } from "utils/api"
import Link from "next/link"
import { formatString } from "utils/formatString"

const ProfileSettings: NextPage = () => {
    const router = useRouter()
    let { userId } = router.query
    userId = userId as string
    const { data: session } = useSession()

    const handleSignOut = () => {
        void signOut({ callbackUrl: "/" })
    }

    const {
        data: stats,
        isLoading,
        error,
    } = api.statistics.getUserStats.useQuery({ userId: userId })

    if (isLoading)
        return (
            <main>
                <ProfileNav selected="settings" />
                <div className="flex justify-center">
                    <div className="grid w-72 gap-2">
                        <dl className="grid gap-1 rounded-xl bg-dark-2 p-2">
                            <dt>Battles won</dt>
                            <dd className="text-transparent">0</dd>
                            <dt>Total pokemon</dt>
                            <dd className="text-transparent">0</dd>
                            <dt>Total teams</dt>
                            <dd className="text-transparent">0</dd>
                            <dt>Favorite team</dt>
                            <dd className="text-transparent">0</dd>
                            <dt>Favorite pokemon</dt>
                            <dd className="text-transparent">0</dd>
                        </dl>
                        {session?.user?.id === userId && (
                            <>
                                <button className="w-full rounded-2xl px-4 py-2">
                                    Change Info
                                </button>
                                <button
                                    className="w-full rounded-2xl px-4 py-2"
                                    onClick={() => void handleSignOut()}
                                >
                                    Log Out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </main>
        )
    if (error) return <div>Error: {error.message}</div>

    const { wins, totalPokemon, totalTeams, favoriteTeam, favoritePokemon } =
        stats

    return (
        <main>
            <ProfileNav selected="settings" />
            <div className="flex justify-center">
                <div className="grid w-72 gap-2">
                    <dl className="grid gap-1 rounded-xl bg-dark-2 p-2">
                        <dt>Battles won</dt>
                        <dd>{wins}</dd>
                        <dt>Total pokemon</dt>
                        <dd>{totalPokemon}</dd>
                        <dt>Total teams</dt>
                        <dd>{totalTeams}</dd>
                        <dt>Favorite team</dt>
                        {favoriteTeam ? (
                            <Link
                                href={`/profile/${userId}/team/${favoriteTeam.id}`}
                            >
                                <dd>{favoriteTeam.teamName}</dd>
                            </Link>
                        ) : (
                            <dd>None</dd>
                        )}
                        <dt>Favorite pokemon</dt>
                        {favoritePokemon ? (
                            <dd>{formatString(favoritePokemon)}</dd>
                        ) : (
                            <dd>None</dd>
                        )}
                    </dl>
                    {session?.user?.id === userId && (
                        <>
                            <button className="w-full rounded-2xl px-4 py-2">
                                Change Info
                            </button>
                            <button
                                className="w-full rounded-2xl px-4 py-2"
                                onClick={() => void handleSignOut()}
                            >
                                Log Out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProfileSettings
