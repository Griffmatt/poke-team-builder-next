import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "../../../utils/api"
import { ProfileNav } from "../../../components/profile/profileNav"
import { PokemonCard } from "../../../components/pokemonCard"

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
            <ProfileNav selected="teams" userId={userId as string} />
            <div className="grid gap-3">
                <h3>Teams</h3>
                {teams?.map((team) => {
                    console.log(team)
                    return (
                        <>
                            <h3>{team.teamName}</h3>
                            <div className="pokemon-card-grid">
                                {team.pokemon.map((pokemon) => {
                                    return (
                                        <div className="pokemon-card">
                                            <PokemonCard
                                                pokemonName={
                                                    pokemon.createdPokemon.name
                                                }
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )
                })}
            </div>
        </main>
    )
}

export default ProfileTeams
