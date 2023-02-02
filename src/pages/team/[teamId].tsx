import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { api } from "utils/api"
import Link from "next/link"
import DeleteModal from "components/deleteModal"
import { useState } from "react"
import { TeamRow } from "components/teamRows"
import { BackButton } from "components/ui/backButton"
import { FavoritedButton } from "components/ui/favoritedButton"

const Team: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const { teamId } = router.query

    const [showModal, setShowModal] = useState(false)

    const { data: team } = api.teams.getTeam.useQuery({
        teamId: teamId as string,
    })

    const { data: favoriteTeams } = api.favorite.getUserFavoriteTeams.useQuery({
        userId: session?.user?.id as string,
    })

    const teamFavorited = favoriteTeams?.includes(teamId as string)

    const apiContext = api.useContext()
    const copyTeam = api.teams.buildTeam.useMutation()

    const favoriteTeam = api.favorite.favoriteTeam.useMutation({
        onSettled: () => {
            apiContext.favorite.getUserFavoriteTeams.invalidate()
        },
    })
    const unfavoriteTeam = api.favorite.unfavoriteTeam.useMutation({
        onSettled: () => {
            apiContext.favorite.getUserFavoriteTeams.invalidate()
        },
    })

    const handleCopy = () => {
        const pokemonIds = team?.pokemon.map((pokemon) => {
            return { pokemonId: pokemon.id }
        })
        copyTeam.mutate({
            userId: session?.user!.id as string,
            teamName: team!.teamName,
            teamStyle: team!.teamStyle,
            originalTrainerId: team?.userId,
            pokemon: pokemonIds ?? [],
        })
    }

    const handleFavorite = () => {
        teamFavorited
            ? unfavoriteTeam.mutate({
                  teamId: teamId as string,
                  userId: session?.user?.id as string,
              })
            : favoriteTeam.mutate({
                  teamId: teamId as string,
                  userId: session?.user?.id as string,
              })
    }
    let winPercentage

    if (team) {
        winPercentage =
            team.wins / team.wins + team.loses === 0
                ? 1
                : team.wins + team.loses
    }

    return (
        <main>
            <BackButton />
            <div className="flex items-center justify-between">
                <div>
                    <h1>{team?.teamName}</h1>
                    <div className="flex gap-2">
                        <h2>{team?.teamStyle}</h2>
                        <div className="rounded-2xl bg-dark-2 px-4 py-1">
                            <h4 className="align-middle">
                                Total Wins: {team?.wins}
                            </h4>
                        </div>
                        {team && (
                            <div className="rounded-2xl bg-dark-2 px-4 py-1">
                                <h4 className="align-middle">
                                    Win Percentage: {winPercentage}
                                </h4>
                            </div>
                        )}
                    </div>
                    {team?.originalTrainerId && (
                        <OriginalTrainer id={team.originalTrainerId} />
                    )}
                </div>
                <div className="flex gap-3">
                    {session?.user?.id === team?.userId ? (
                        <button
                            className="btn-red h-fit rounded-2xl px-4 py-2"
                            onClick={() => setShowModal(true)}
                        >
                            Delete
                        </button>
                    ) : (
                        <button
                            className="h-fit rounded-2xl px-4 py-2"
                            onClick={handleCopy}
                        >
                            Copy Team
                        </button>
                    )}
                    <FavoritedButton
                        favorited={teamFavorited ?? false}
                        handleFavorite={handleFavorite}
                        absolute={false}
                    />
                </div>
            </div>
            {team && (
                <>
                    <TeamRow team={team} withStats={true} />
                    <DeleteModal
                        userId={team?.userId}
                        name={team?.teamName}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        teamId={team?.id}
                    />
                </>
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
