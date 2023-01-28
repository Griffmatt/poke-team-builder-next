import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "../../../utils/api"
import { ProfileNav } from "../../../components/profile/profileNav"

const ProfileSettings: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query

    const { data: user } = api.users.getUser.useQuery({
        userId: userId as string,
    })

    return (
        <main>
            <div className="grid gap-3">
                <div>
                    {user && (
                        <img src={user.image ?? ""} className="rounded-full" />
                    )}
                </div>
                <h2>{user?.name}</h2>
            </div>
            <ProfileNav selected="settings" userId={userId as string} />
            <div className="grid gap-3">
            </div>
        </main>
    )
}

export default ProfileSettings
