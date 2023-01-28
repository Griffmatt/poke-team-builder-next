import { type NextPage } from "next"
import { useRouter } from "next/router"
import { PokemonCard } from "../../components/pokemonCard"
import { api } from "../../utils/api"

const Team: NextPage = () => {
    const router = useRouter()

    const { teamId } = router.query

    const { data: team } = api.teams.getTeam.useQuery({
        teamId: teamId as string,
    })

    return (
        <main>
            <div>
                <h2>{team?.teamName}</h2>
                <h3>{team?.teamStyle}</h3>
            </div>
            <div className="pokemon-card-grid">
                {team?.pokemon.map((pokemon) => {
                    return (
                        <div
                            key={pokemon.createdPokemon.id}
                            className="pokemon-card"
                        >
                            <PokemonCard
                                pokemonName={pokemon.createdPokemon.name}
                            />
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default Team
