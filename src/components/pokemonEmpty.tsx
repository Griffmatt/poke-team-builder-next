import Link from "next/link"

const PokemonEmpty = ({ query, }: { query: string }) => {
    if (query) {
        return (
            <div className="aspect-[2] w-80 rounded-2xl dark:bg-dark-2 text-center grid place-items-center mx-auto">
                <h2>
                    There were no results
                    <br /> for your query
                </h2>
                <h3>{query}</h3>
            </div>
        )
    }

    return (
        <div className="aspect-[2] w-80 rounded-2xl dark:bg-dark-2 text-center grid place-items-center mx-auto">
            <h2>You haven't created any pokemon yet!</h2>
            <Link href="/pokemon">Click here to view pokemon to create</Link>
        </div>
    )
}

export default PokemonEmpty