import { useSession } from "next-auth/react"
import Link from "next/link"

interface Props {
    selected: "pokemon" | "teams" | "settings"
    userId: string
}

const ProfileNav = ({ selected, userId }: Props) => {
    const { data: session } = useSession()
    return (
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
                    <h3 className={selected === "settings" ? "border-b-2" : ""}>
                        Settings
                    </h3>
                </Link>
            )}
        </div>
    )
}

export { ProfileNav }
