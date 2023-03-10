import { useSession } from "next-auth/react"
import Link from "next/link"
interface Props {
    query?: string
    userId?: string
    favoriteRows?: boolean
}

export const TeamsEmpty = ({ query, userId, favoriteRows }: Props) => {
    const { data: session } = useSession()
    const className =
        "mx-auto grid aspect-[2] place-items-center rounded-2xl text-center"
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
                    <h2>They haven't favorited any Teams yet!</h2>
                </div>
            ) : (
                <div className={className}>
                    <h2>They haven't created any Teams yet!</h2>
                </div>
            )}
        </>
    )
}
