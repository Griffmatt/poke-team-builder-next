import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "utils/api"
import { ProfileNav } from "components/profile/profileNav"
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react"

const ProfileSettings: NextPage = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const { userId } = router.query

    const { data: user } = api.users.getUser.useQuery({
        userId: userId as string,
    })

    useEffect(() => {
        const castOffUser = async () => {
            await router.replace("/")
        }

        if (session?.user?.id !== userId) {
            void castOffUser()
        }
    }, [router, session?.user?.id, userId])

    const handleSignOut = async () => {
        await signOut()
        await router.replace("/")
    }

    return (
        <main>
            <ProfileNav
                selected="settings"
                userId={userId as string}
                user={user}
            />
            <div className="grid gap-3 bg-dark-2">
                <button
                    className="rounded-2xl px-4 py-2"
                    onClick={void handleSignOut}
                >
                    Log Out
                </button>
            </div>
        </main>
    )
}

export default ProfileSettings
