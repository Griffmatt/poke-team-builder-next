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
            {user == null ? (
                <>
                    <div className="h-16 w-full animate-pulse rounded bg-dark-2 md:h-24 lg:h-40" />

                    <div className="grid h-44 grid-rows-2 px-1 text-center">
                        <div className="row-span-2 grid h-fit w-fit gap-1">
                            <div className="aspect-square w-24 md:w-32">
                                <div className="h-full w-full animate-pulse rounded-full border-8 border-dark bg-dark-2" />
                            </div>
                            <div className="h-8 w-28 animate-pulse bg-dark-2" />
                        </div>
                    </div>
                </>
            ) : (
                <UserHeader user={user} />
            )}
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

const UserHeader = ({ user }: { user: user }) => {
    return (
        <>
            <div className="h-16 w-full rounded bg-dark-2 md:h-24 lg:h-40">
                <img
                    src={pokemonImage.src}
                    className="h-32 w-full rounded object-cover md:h-44 lg:h-60"
                />
            </div>
            <div className="grid h-44 grid-rows-2 px-1 text-center">
                <div className="row-span-2 grid h-fit w-fit gap-1">
                    <div className="aspect-square w-24 md:w-32">
                        <img
                            src={user?.image ?? ""}
                            className="rounded-full border-8 border-dark"
                        />
                    </div>
                    <h2>{user?.name}</h2>
                </div>
            </div>
        </>
    )
}
