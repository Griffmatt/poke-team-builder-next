import { type NextPage } from 'next'
import { api } from '../utils/api'

const Home: NextPage = () => {
    const { data: users } = api.users.getSuggestedUsers.useQuery()
    console.log(users)
    return (
        <main>
            <div className="grid gap-4">
                <h2>Suggested Trainers</h2>
                <div className="grid grid-cols-5 place-items-center">
                    {users?.slice(0, 4).map((user) => {
                        return (
                            <div className="grid w-fit gap-2" key={user.id}>
                                <img
                                    src={user.image ?? ''}
                                    className="rounded-full"
                                />
                                <h3 className="text-center">{user.name}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <h2>Statistics</h2>
            </div>
            <div>
                <h2>What to do?</h2>
            </div>
        </main>
    )
}

export default Home
