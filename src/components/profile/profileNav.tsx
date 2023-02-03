import { useSession } from "next-auth/react"
import Link from "next/link"
import pokemonImage from "assets\pokemon.jpg"

interface Props {
    selected: "pokemon" | "teams" | "settings" | "favorites"
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
            <div className="w-ful h-40 bg-dark-2">
                <img src={pokemonImage.src}/>
            </div>
            <div className="flex h-44 flex-col justify-between">
                <div className="aspect-square w-32">
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
                <Link href={`/profile/${userId}/favorites`}>
                    <h3
                        className={selected === "favorites" ? "border-b-2" : ""}
                    >
                        Favorites
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
