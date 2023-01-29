import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import PokemonCardWithStats from "../../components/pokemonCardWithStats"
import { api } from "../../utils/api"
import Link from "next/link"

const Team: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const { teamId } = router.query

    const { data: team } = api.teams.getTeam.useQuery({
        teamId: teamId as string,
    })

    const copyTeamMutation = api.teams.buildTeam.useMutation()

    const deleteTeamMutation = api.teams.deleteTeam.useMutation({
        onSuccess: () => {
            router.push(`/profile/${team?.userId}/teams`)
        },
    })

    const handleCopy = () => {
        const pokemonIds = team?.pokemon.map(({ createdPokemon }) => {
            return { pokemonId: createdPokemon.id as string }
        })
        copyTeamMutation.mutate({
            userId: session?.user?.id as string,
            teamName: team?.teamName as string,
            teamStyle: team?.teamStyle as string,
            originalTrainerId: team?.userId,
            pokemon: {
                createMany: {
                    data: pokemonIds ?? [],
                },
            },
        })
    }

    return (
        <main>
            <div className="flex items-center justify-between">
                <div>
                    <h1>{team?.teamName}</h1>
                    <h2>{team?.teamStyle}</h2>
                    {team?.originalTrainerId && <OriginalTrainer id={team?.originalTrainerId} />}
                </div>
                <button
                    className="h-fit rounded-2xl px-4 py-2"
                    onClick={() =>
                        deleteTeamMutation.mutate({ id: teamId as string })
                    }
                >
                    Delete Team
                </button>
                <button
                    className="h-fit rounded-2xl px-4 py-2"
                    onClick={handleCopy}
                >
                    Copy Team
                </button>
            </div>
            <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-3">
                {team?.pokemon.map(({ createdPokemon }) => {
                    return (
                        <div key={createdPokemon.id} className="pokemon-card">
                            <PokemonCardWithStats
                                pokemonName={createdPokemon.name}
                                createdPokemon={createdPokemon}
                            />
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default Team


const OriginalTrainer = ({ id }: { id: string }) => {
    const { data: user } = api.users.getUser.useQuery({
        userId: id as string,
    })
    return (
        <>
            {user && (
                <Link href={`/profile/${user?.id}`} className="hover:border-b-2">
                    <h2>Original Trainer: {user?.name}</h2>
                </Link>
            )}
        </>
    )
}
