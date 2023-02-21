import { type NextPage } from "next"
import { ProfileNav } from "components/profile/profileNav"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { api } from "utils/api"

const ProfileSettings: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query
    const { data: session } = useSession()

    const {
        data: user,
        isLoading,
        error,
    } = api.users.getUser.useQuery({ userId: userId as string })

    const handleSignOut = () => {
        void signOut({ callbackUrl: "/" })
    }

    if (isLoading) {
        return (
            <main>
                <ProfileNav
                    selected="teams"
                    userId={userId as string}
                    user={user}
                />
                <div className="flex justify-center">
                    <div className="grid w-72 gap-2">
                        <div className="grid w-full gap-1 rounded-xl bg-dark-2 p-2">
                            <h4>Battles won</h4>
                            <p>0</p>
                            <h4>Total pokemon</h4>
                            <p>0</p>
                            <h4>Total teams</h4>
                            <p>0</p>
                            <h4>Favorite team</h4>
                            <p>none</p>
                            <h4>Favorite pokemon</h4>
                            <p>Bulbasaur</p>
                        </div>
                        {session?.user?.id === userId && (
                            <>
                                <button className="w-full rounded-2xl px-4 py-2">
                                    Change Info
                                </button>
                                <button className="w-full rounded-2xl px-4 py-2">
                                    Dark Mode
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

    if (error) return <div>Error: {error.message}</div>

    if (user === null) {
        return <div>User Not Found</div>
    }

    return (
        <main>
            <ProfileNav
                selected="settings"
                userId={userId as string}
                user={user}
            />
            <div className="flex justify-center">
                <div className="grid w-72 gap-2">
                    <div className="grid w-full gap-1 rounded-xl bg-dark-2 p-2">
                        <h4>Battles won</h4>
                        <p>0</p>
                        <h4>Total pokemon</h4>
                        <p>0</p>
                        <h4>Total teams</h4>
                        <p>0</p>
                        <h4>Favorite team</h4>
                        <p>none</p>
                        <h4>Favorite pokemon</h4>
                        <p>Bulbasaur</p>
                    </div>
                    {session?.user?.id === userId && (
                        <>
                            <button className="w-full rounded-2xl px-4 py-2">
                                Change Info
                            </button>
                            <button className="w-full rounded-2xl px-4 py-2">
                                Dark Mode
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
