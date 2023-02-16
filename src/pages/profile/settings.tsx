import { type NextPage } from "next"
import { useRouter } from "next/router"
import { ProfileNav } from "components/profile/profileNav"
import { signOut, useSession } from "next-auth/react"

const ProfileSettings: NextPage = () => {
    const router = useRouter()
    const { data: session } = useSession()

    const handleSignOut = async () => {
        await signOut()
        await router.replace("/")
    }

    return (
        <main>
            <ProfileNav
                selected="settings"
                userId={session?.user?.id as string}
                user={session?.user}
            />
            <div className="grid gap-3 bg-dark-2">
                <button
                    className="rounded-2xl px-4 py-2"
                    onClick={() => void handleSignOut()}
                >
                    Log Out
                </button>
            </div>
        </main>
    )
}

export default ProfileSettings
