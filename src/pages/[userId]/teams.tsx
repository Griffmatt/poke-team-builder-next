import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "../../utils/api"
import { ProfileNav } from "../../components/profile/profileNav"

const ProfileTeams: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query

    const { data: user } = api.users.getUser.useQuery({
        userId: userId as string,
    })

    const { data: teams } = api.teams.getUserTeams.useQuery({
        userId: userId as string,
    })

    return (
        <main>
            <div className="grid gap-3">
                <div>
                    {user && (
                        <img src={user.image ?? ""} className="rounded-full" />
                    )}
                </div>
                <h2>{user?.name}</h2>
            </div>
            <ProfileNav selected="pokemon" userId={userId as string} />
            <div>
                <h3>Teams</h3>
                <div>
                    {teams?.map((team) => {
                        return (
                            <div>
                                {team.pokemon.map((pokemon) => {
                                    return <div>{pokemon.createdPokemon.name}</div>
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default ProfileTeams
