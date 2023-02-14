import { useSession } from "next-auth/react"
import Link from "next/link"

interface Props {
    query?: string
    hasPokemon?: boolean
    userId?: string
    favoriteGrid?: boolean
}

export const PokemonEmpty = ({
    query,
    hasPokemon,
    userId,
    favoriteGrid,
}: Props) => {
    const { data: session } = useSession()

    const wrapperClass =
        "mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl p-3 text-center"

    if (query) {
        return (
            <div className={wrapperClass}>
                <h2>There were no results for your query</h2>
                <h3>{query}</h3>
            </div>
        )
    }

    if (hasPokemon) {
        return (
            <div className={wrapperClass}>
                <h2>You have no pokemon left!</h2>
                <Link href="/build/pokemon">
                    Click here to view pokemon to build
                </Link>
            </div>
        )
    }

    if (userId === session?.user?.id) {
        return (
            <>
                {favoriteGrid ? (
                    <div className={wrapperClass}>
                        <h2>You haven't favorited any pokemon yet!</h2>
                    </div>
                ) : (
                    <div className={wrapperClass}>
                        <h2>You haven't built any pokemon yet!</h2>
                        <Link href="/build/pokemon">
                            Click here to view pokemon to build
                        </Link>
                    </div>
                )}
            </>
        )
    }

    return (
        <>
            {favoriteGrid ? (
                <div className={wrapperClass}>
                    <h2>They haven't favorited any pokemon yet!</h2>
                </div>
            ) : (
                <div className={wrapperClass}>
                    <h2>They haven't built any pokemon yet!</h2>
                </div>
            )}
        </>
    )
}
