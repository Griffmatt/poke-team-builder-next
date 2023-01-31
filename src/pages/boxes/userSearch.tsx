import { type NextPage } from "next"
import { api } from "../../utils/api"
import Link from "next/link"
import { BoxesNav } from "../../components/boxes/boxesNav"

const Boxes: NextPage = () => {
    const { data: users } = api.users.getSuggestedUsers.useQuery()
    return (
        <main>
            <h2>Boxes</h2>
            <BoxesNav selected="search" />
            <div className="grid gap-3">
                <h2>Suggested Trainers</h2>
                <div className="no-scrollbar flex gap-2 overflow-x-scroll">
                    {users?.map((user) => {
                        return (
                            <Link
                                href={`/profile/${user.id}`}
                                className="grid w-fit gap-2"
                                key={user.id}
                            >
                                <img
                                    src={user.image ?? ""}
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
