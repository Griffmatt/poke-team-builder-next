import Link from "next/link"
import Image from "next/image"

import { ProfileSearch } from "./profileSearch"
import { type user } from "types/trpc"
import { firstNameOnly } from "utils/firstNameOnly"

interface Props {
    selected: "pokemon" | "teams" | "settings" | "favorites"
    userId: string
    user?: user | null
}

export const ProfileNav = ({ selected, userId, user }: Props) => {
    return (
        <>
            <ProfileSearch userId={userId} />
            {user == null ? (
                <div className="grid h-44 grid-rows-2 px-1 text-center">
                    <div className="row-span-2 flex h-fit w-fit flex-col items-center gap-1">
                        <div className="aspect-square w-24 md:w-32">
                            <div className="h-full w-full animate-pulse rounded-full border-8 border-dark-3 bg-dark-2" />
                        </div>
                        <div className="h-6 w-24 animate-pulse bg-dark-2" />
                    </div>
                </div>
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
                <Link href={`/profile/${userId}/stats`}>
                    <h3 className={selected === "settings" ? "border-b-2" : ""}>
                        Stats
                    </h3>
                </Link>
            </div>
        </>
    )
}

const UserHeader = ({ user }: { user: user }) => {
    return (
        <div className="grid h-44 grid-rows-2 px-1 text-center">
            <div className="row-span-2 grid h-fit w-fit gap-1">
                <div className="aspect-square w-24 md:w-32">
                    {user?.image ? (
                        <Image
                            src={user.image}
                            className="h-full w-full rounded-full border-4 border-dark-3"
                            referrerPolicy="no-referrer"
                            alt="Profile Picture"
                            width="96"
                            height="96"
                        />
                    ) : (
                        <div className="rounded-full border-4 border-dark-3" />
                    )}
                </div>
                {user?.name && <h2>{firstNameOnly(user.name)}</h2>}
            </div>
        </div>
    )
}
