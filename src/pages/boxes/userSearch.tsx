import { type NextPage } from "next"
import { api } from "utils/api"
import Link from "next/link"
import { BoxesNav } from "components/boxes/boxesNav"
import { useState } from "react"
import { useDebounceQuery } from "hooks/useDebounceQuery"
import { user } from "types/trpc"
import { firstNameOnly } from "utils/firstNameOnly"

const Boxes: NextPage = () => {
    const [query, setQuery] = useState("")
    const debouncedValue = useDebounceQuery(query)
    const {
        data: suggestedUsers,
        isLoading,
        error,
    } = api.users.getSuggestedUsers.useQuery()
    const { data: queryUsers } = api.users.getUserWithQuery.useQuery({
        query: debouncedValue,
    })

    if (isLoading) {
        const fillerArr = Array.from({ length: 20 }, () => 0)
        return (
            <main>
                <h1>Boxes</h1>
                <BoxesNav selected="trainers" />
                <div className="grid gap-3">
                    <h2>Suggested</h2>
                    <div className="no-scrollbar flex gap-2 overflow-x-scroll">
                        {fillerArr.map((_, index) => {
                            return (
                                <div className="grid w-fit gap-2" key={index}>
                                    <div className="h-20 w-20 animate-pulse rounded-full bg-dark-2" />
                                    <h3 className="h-6 w-20 animate-pulse bg-dark-2 text-center" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="grid gap-3">
                    <div className="flex flex-col justify-between gap-2 md:flex-row">
                        <h2>Search</h2>
                        <input
                            placeholder="Search for trainers..."
                            onChange={(event) => setQuery(event.target.value)}
                            className="rounded-2xl px-4 py-2 text-black outline-none md:w-60"
                        />
                    </div>
                </div>
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>

    return (
        <main>
            <h1>Boxes</h1>
            <BoxesNav selected="trainers" />
            <SuggestedUsers users={suggestedUsers} />
            <div className="grid gap-3">
                <div className="flex flex-col justify-between gap-2 md:flex-row">
                    <h2>Search</h2>
                    <input
                        placeholder="Search for trainers..."
                        onChange={(event) => setQuery(event.target.value)}
                        className="rounded-2xl px-4 py-2 text-black outline-none md:w-60"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    {queryUsers?.map((user) => {
                        return (
                            <Link
                                href={`/profile/${user.id}`}
                                className="grid w-fit gap-2"
                                key={user.id}
                            >
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        className="h-auto w-24 rounded-full"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="h-auto w-24 rounded-full" />
                                )}
                                <h3 className="text-center">{firstNameOnly(user?.name)}</h3>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default Boxes

interface SuggestedProps {
    users: user[] | []
}

const SuggestedUsers = ({ users }: SuggestedProps) => {
    return (
        <div className="grid gap-3">
            <h2>Suggested</h2>
            <div className="no-scrollbar flex gap-2 overflow-x-scroll">
                {users.map((user) => {
                    if (user == null) return
                    return (
                        <Link
                            href={`/profile/${user.id}`}
                            className="grid w-fit gap-2"
                            key={user.id}
                        >
                            {user.image ? (
                                <img
                                    src={user.image}
                                    className="h-20 w-auto rounded-full"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="h-20 w-auto rounded-full" />
                            )}
                            <h3 className="text-center">{firstNameOnly(user?.name)}</h3>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
