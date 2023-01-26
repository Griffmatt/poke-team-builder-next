import Link from 'next/link'

const PokemonEmpty = ({ query }: { query: string }) => {
    if (query) {
        return (
            <div className="mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl text-center dark:bg-dark-2">
                <h2>
                    There were no results
                    <br /> for your query
                </h2>
                <h3>{query}</h3>
            </div>
        )
    }

    return (
        <div className="mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl text-center dark:bg-dark-2">
            <h2>You haven't created any pokemon yet!</h2>
            <Link href="/pokemon">Click here to view pokemon to create</Link>
        </div>
    )
}

export default PokemonEmpty
