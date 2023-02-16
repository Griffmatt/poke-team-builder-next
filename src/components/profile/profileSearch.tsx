import { useDebounceQuery } from "hooks/useDebounceQuery"
import Image from "next/image"
import Link from "next/link"
import { type ChangeEvent, useState, useEffect } from "react"
import { api } from "utils/api"
import { firstNameOnly } from "utils/firstNameOnly"

interface Props {
    userId: string
}

type ClickInput = React.MouseEvent<HTMLInputElement, MouseEvent>

export const ProfileSearch = ({ userId }: Props) => {
    const [query, setQuery] = useState("")
    const [showUsers, setShowUsers] = useState(false)
    const debouncedValue = useDebounceQuery(query)
    const { data: suggestedUsers } = api.users.getSuggestedUsers.useQuery()
    const { data: queryUsers } = api.users.getUserWithQuery.useQuery(
        {
            query: query,
        },
        { enabled: query !== "" }
    )

    const handleClick = (event: ClickInput) => {
        event.stopPropagation()
        setShowUsers(true)
    }

    const handleFocus = () => {
        setShowUsers(true)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
        setShowUsers(true)
    }

    const handleProfileSelect = () => {
        setShowUsers(false)
        setQuery("")
    }

    useEffect(() => {
        window.addEventListener("click", () => setShowUsers(false))
        return () =>
            window.removeEventListener("click", () => setShowUsers(false))
    }, [])

    const shownUsers = debouncedValue.length === 0 ? suggestedUsers : queryUsers

    const filterProfileUserOut = shownUsers?.filter(
        (user) => user.id !== userId
    )

    return (
        <div className="ml-auto grid w-full gap-1 md:w-fit">
            <input
                placeholder="Search for trainers..."
                onChange={handleChange}
                onFocus={handleFocus}
                onClick={(event) => handleClick(event)}
                className="rounded-2xl px-4 py-2 text-black md:w-60"
            />
            <div className="relative w-full">
                {showUsers && (
                    <div
                        className="absolute top-0 max-h-60 w-full rounded-2xl bg-dark-2"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {filterProfileUserOut?.map((user, index) => {
                            const firstUser = index === 0
                            return (
                                <Link
                                    href={`/profile/${user.id}`}
                                    className={`flex h-12 w-full items-center justify-between p-2 ${
                                        firstUser
                                            ? ""
                                            : "border-t border-dark-3"
                                    }`}
                                    onClick={handleProfileSelect}
                                    key={user.id}
                                >
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            className="h-full w-auto rounded-full"
                                            referrerPolicy="no-referrer"
                                            alt="User Profile Picture"
                                            width="96"
                                            height="96"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full" />
                                    )}
                                    <h3 className="text-center">
                                        {firstNameOnly(user?.name)}
                                    </h3>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
