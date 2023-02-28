import Link from "next/link"
import Image from "next/image"
import { ProfileSearch } from "./profileSearch"
import { firstNameOnly } from "utils/firstNameOnly"
import { SkeletonRoundImage } from "components/pokemonCards/ui/skeletonPokemonImage"
import { api } from "utils/api"
import { useRouter } from "next/router"

interface Props {
    selected: "pokemon" | "teams" | "settings" | "favorites"
}

export const ProfileNav = ({ selected }: Props) => {
    const router = useRouter()
    let { userId } = router.query
    userId = userId as string

    return (
        <>
            <ProfileSearch userId={userId} />
            <UserHeader userId={userId} />
            <ProfileNavLinks selected={selected} userId={userId} />
        </>
    )
}

const UserHeader = ({ userId }: { userId: string }) => {
    const {
        data: user,
        isLoading,
        error,
    } = api.users.getUser.useQuery({ userId: userId })

    if (isLoading) {
        return (
            <div className="grid h-44 grid-rows-2 px-1 text-center">
                <div className="row-span-2 flex h-fit w-fit flex-col items-center gap-1">
                    <div className="aspect-square w-24 md:w-32">
                        <SkeletonRoundImage />
                    </div>
                    <h2 className="h-6 w-24 animate-pulse bg-dark-2" />
                </div>
            </div>
        )
    }
    if (error) return <div>Error: {error.message}</div>

    if (user === null) return <div>User not found!</div>
    return (
        <nav className="grid h-44 grid-rows-2 px-1 text-center">
            <div className="row-span-2 grid h-fit w-fit gap-1">
                <div className="aspect-square w-24 md:w-32">
                    {user?.image ? (
                        <Image
                            src={user.image}
                            className="w-full rounded-full border-4 border-dark-3"
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
        </nav>
    )
}

const ProfileNavLinks = ({
    selected,
    userId,
}: {
    selected: "pokemon" | "teams" | "settings" | "favorites"
    userId: string
}) => {
    return (
        <div className="flex justify-center gap-3">
            <Link href={`/profile/${userId}`}>
                <h3
                    className={
                        selected === "pokemon" ? "border-b-2" : "text-gray"
                    }
                >
                    Pokemon
                </h3>
            </Link>
            <Link href={`/profile/${userId}/teams`}>
                <h3
                    className={
                        selected === "teams" ? "border-b-2" : "text-gray"
                    }
                >
                    Teams
                </h3>
            </Link>
            <Link href={`/profile/${userId}/favorites`}>
                <h3
                    className={
                        selected === "favorites" ? "border-b-2" : "text-gray"
                    }
                >
                    Favorites
                </h3>
            </Link>
            <Link href={`/profile/${userId}/stats`}>
                <h3
                    className={
                        selected === "settings" ? "border-b-2" : "text-gray"
                    }
                >
                    Stats
                </h3>
            </Link>
        </div>
    )
}
