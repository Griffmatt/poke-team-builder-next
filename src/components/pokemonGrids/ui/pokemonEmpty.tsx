import Link from "next/link"

interface Props {
    query?: string
    hasPokemon?: boolean
}

export const PokemonEmpty = ({ query, hasPokemon }: Props) => {
    if (query) {
        return (
            <div className="mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl p-3 text-center dark:bg-dark-2">
                <h2>There were no results for your query</h2>
                <h3>{query}</h3>
            </div>
        )
    }

    if (hasPokemon) {
        return (
            <div className="mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl p-3 text-center dark:bg-dark-2">
                <h2>You have no pokemon left!</h2>
                <Link href="/build/pokemon">
                    Click here to view pokemon to build
                </Link>
            </div>
        )
    }

    return (
        <div className="mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl p-3 text-center dark:bg-dark-2">
            <h2>You haven't built any pokemon yet!</h2>
            <Link href="/build/pokemon">
                Click here to view pokemon to build
            </Link>
        </div>
    )
}
