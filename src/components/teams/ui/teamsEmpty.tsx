import { useSession } from "next-auth/react"
import Link from "next/link"

interface Props {
    query?: string
    userId?: string
    userName?: string | null
    favoriteRows?: boolean
}

export const TeamsEmpty = ({
    query,
    userId,
    userName,
    favoriteRows,
}: Props) => {
    const { data: session } = useSession()
    const className =
        "mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl p-6 text-center dark:bg-dark-2"
    if (query) {
        return (
            <div className={className}>
                <h2>There were no results for your query</h2>
                <h3>{query}</h3>
            </div>
        )
    }

    if (userId === session?.user?.id) {
        return (
            <>
                {favoriteRows ? (
                    <div className={className}>
                        <h2>You haven't favorited any Teams yet!</h2>
                    </div>
                ) : (
                    <div className={className}>
                        <h2>You haven't built any Teams yet!</h2>
                        <Link href="/build/team">
                            Click here to view build team
                        </Link>
                    </div>
                )}
            </>
        )
    }

    return (
        <>
            {favoriteRows ? (
                <div className={className}>
                    <h2>
                        {userName ?? "They"} {userName ? "hasn't" : "haven't"}{" "}
                        favorited any Teams yet!
                    </h2>
                </div>
            ) : (
                <div className={className}>
                    <h2>
                        {userName ?? "They"} {userName ? "hasn't" : "haven't"}{" "}
                        created any Teams yet!
                    </h2>
                </div>
            )}
        </>
    )
}
