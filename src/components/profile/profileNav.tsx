import { useSession } from "next-auth/react"
import Link from "next/link"

interface Props {
    selected: "pokemon" | "teams" | "settings"
    userId: string
    user?: {
        image: string | null
        id: string
        name: string | null
        userName: string | null
    } | null
}

const ProfileNav = ({ selected, userId, user }: Props) => {
    const { data: session } = useSession()
    return (
        <>
            <div className="grid gap-3 h-44">
                <div className="w-32 aspect-square">
                    {user && (
                        <img src={user.image ?? ""} className="rounded-full" />
                    )}
                </div>
                <h2>{user?.name}</h2>
            </div>
            <div className="flex justify-center gap-3">
                <Link href={`/profile/${userId}`}>
                    <h3 className={selected === "pokemon" ? "border-b-2" : ""}>
                        Pokemon
                    </h3>
                </Link>
                <Link href={`/profile/${userId}/teams`}>
                    <h3 className={selected === "teams" ? "border-b-2" : ""}>
                        Teams
                    </h3>
                </Link>
                {session?.user?.id === userId && (
                    <Link href={`/profile/${userId}/settings`}>
                        <h3
                            className={
                                selected === "settings" ? "border-b-2" : ""
                            }
                        >
                            Settings
                        </h3>
                    </Link>
                )}
            </div>
        </>
    )
}

export { ProfileNav }
