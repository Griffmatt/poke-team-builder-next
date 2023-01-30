import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { PokemonCardWithStats } from "../../components/pokemonCardWithStats"
import { api } from "../../utils/api"
import Link from "next/link"
import DeleteModal from "../../components/deleteModal"
import { useState } from "react"

const Team: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const { teamId } = router.query

    const [showModal, setShowModal] = useState(false)

    const { data: team } = api.teams.getTeam.useQuery({
        teamId: teamId as string,
    })
    const { data: favorites } = api.favorite.getUserFavoritePokemon.useQuery({
        userId: session?.user?.id as string,
    })

    const copyTeamMutation = api.teams.buildTeam.useMutation()

    const handleCopy = () => {
        const pokemonIds = team?.pokemon.map((pokemon) => {
            return { pokemonId: pokemon.id }
        })
        copyTeamMutation.mutate({
            userId: session?.user!.id as string,
            teamName: team!.teamName,
            teamStyle: team!.teamStyle,
            originalTrainerId: team?.userId,
            pokemon: pokemonIds ?? [],
        })
    }

    return (
        <main>
            <div className="flex items-center justify-between">
                <div>
                    <h1>{team?.teamName}</h1>
                    <h2>{team?.teamStyle}</h2>
                    {team?.originalTrainerId && (
                        <OriginalTrainer id={team.originalTrainerId} />
                    )}
                </div>
                {session?.user?.id === team?.userId ? (
                    <button
                        className="btn-red h-fit rounded-2xl px-4 py-2"
                        onClick={() => setShowModal(true)}
                    >
                        Delete Team
                    </button>
                ) : (
                    <button
                        className="h-fit rounded-2xl px-4 py-2"
                        onClick={handleCopy}
                    >
                        Copy Team
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-3">
                {team?.pokemon.map((pokemon) => {
                    return (
                        <div key={pokemon.id} className="pokemon-card">
                            <PokemonCardWithStats
                                pokemonName={pokemon.name}
                                createdPokemon={pokemon}
                                favorite={favorites?.includes(pokemon.id)}
                            />
                        </div>
                    )
                })}
            </div>
            {team && (
                <DeleteModal
                    userId={team?.userId}
                    name={team?.teamName}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    teamId={team?.id}
                />
            )}
        </main>
    )
}

export default Team

const OriginalTrainer = ({ id }: { id: string }) => {
    const { data: user } = api.users.getUser.useQuery({
        userId: id,
    })
    return (
        <>
            {user && (
                <Link
                    href={`/profile/${user?.id}`}
                    className="hover:border-b-2"
                >
                    <h2>Original Trainer: {user?.name}</h2>
                </Link>
            )}
        </>
    )
}