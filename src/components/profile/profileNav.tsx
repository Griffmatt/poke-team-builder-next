import { useSession } from "next-auth/react"
import Link from "next/link"
import pokemonImage from "assets/pokemon.jpg"
import { user } from "types/trpc"

interface Props {
    selected: "pokemon" | "teams" | "settings" | "favorites"
    userId: string
    user?: user
}

export const ProfileNav = ({ selected, userId, user }: Props) => {
    const { data: session } = useSession()
    return (
        <>
            <div className="h-40 w-full rounded bg-dark-2">
                <img
                    src={pokemonImage.src}
                    className="h-60 w-full rounded object-cover"
                />
            </div>
            <div className="flex h-44 w-fit flex-col justify-around px-1 text-center">
                <div className="aspect-square w-32">
                    {user && (
                        <img
                            src={user.image ?? ""}
                            className="rounded-full border-8 border-dark"
                        />
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

