import { type NextPage } from "next"
import { api } from "utils/api"
import Link from "next/link"
import { BoxesNav } from "components/boxes/boxesNav"
import { useState } from "react"
import { useDebounceQuery } from "hooks/useDebounceQuery"

const Boxes: NextPage = () => {
    const [query, setQuery] = useState("")
    const debouncedValue = useDebounceQuery(query)
    const { data: suggestedUsers } = api.users.getSuggestedUsers.useQuery()
    const { data: queryUsers } = api.users.getUserWithQuery.useQuery({
        query: debouncedValue,
    })
    return (
        <main>
            <h1>Boxes</h1>
            <BoxesNav selected="trainers" />
            <div className="grid gap-3">
                <h2>Suggested</h2>
                <div className="no-scrollbar flex gap-2 overflow-x-scroll">
                    {suggestedUsers?.map((user) => {
                        return (
                            <Link
                                href={`/profile/${user.id}`}
                                className="grid w-fit gap-2"
                                key={user.id}
                            >
                                <img
                                    src={user.image ?? ""}
                                    className="h-20 w-auto rounded-full"
                                />
                                <h3 className="text-center">{user.name}</h3>
                            </Link>
                        )
                    })}
                </div>
                <div className="grid gap-3">
                    <div className="flex flex-col justify-between gap-2 md:flex-row">
                        <h2>Search</h2>
                        <input
                            placeholder="Search for trainers..."
                            onChange={(event) =>
                                setQuery(event.target.value)
                            }
                            className="rounded-2xl px-4 py-2 text-black outline-none md:w-60"
                        />
                    </div>
                    {queryUsers?.map((user) => {
                        return (
                            <Link
                                href={`/profile/${user.id}`}
                                className="grid w-fit gap-2"
                                key={user.id}
                            >
                                <img
                                    src={user?.image ?? ""}
                                    className="rounded-full"
                                />
                                <h3 className="text-center">{user.name}</h3>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default Boxes
