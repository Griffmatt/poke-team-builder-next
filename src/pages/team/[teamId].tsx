import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { api } from "utils/api"
import { DeleteModal } from "components/modals/deleteModal"
import { useState } from "react"
import { FavoritedButton } from "components/ui/favoritedButton"
import { BattleModal } from "components/modals/battleModal"
import { formatPercentage } from "utils/formatPercentage"
import { addFavoriteTeamMutation } from "mutations/addFavoriteTeam"
import { removeFavoriteTeamMutation } from "mutations/removeFavoriteTeam"
import { type team } from "types/trpc"
import { TeamRow } from "components/teams/teamRow"
import { SkeletonPokemonGridWithStats } from "components/pokemonGrids/ui/skeletonPokemonGridWithStats"

const Team: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const { teamId } = router.query

    const {
        data: team,
        isLoading,
        error,
    } = api.teams.getTeam.useQuery({
        teamId: teamId as string,
    })

    const {
        data: favoriteTeams,
        isLoading: isLoading2,
        error: error2,
        isFetching,
    } = api.favorite.checkUserFavoriteTeams.useQuery(
        {
            userId: session?.user?.id as string,
        },
        { enabled: !!session?.user?.id }
    )

    if (isLoading || (isLoading2 && isFetching)) {
        return (
            <main>
                <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                        <div className="h-8 w-36 animate-pulse bg-dark-2" />
                        <div className="flex flex-col gap-2 md:flex-row">
                            <div className="h-7 w-16 animate-pulse bg-dark-2 md:h-8" />
                            <div className="flex gap-2">
                                <div className="h-7 w-24 animate-pulse bg-dark-2 md:h-8" />
                                <div className="h-7 w-44 animate-pulse bg-dark-2 md:h-8" />
                            </div>
                        </div>
                    </div>
                </div>
                <SkeletonPokemonGridWithStats amount={6} />
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>

    if (team === null) return <div>Team not found!</div>

    const teamFavorited = favoriteTeams?.includes(team?.id ?? "")

    const percentage = team
        ? formatPercentage(team.wins / (team.battles === 0 ? 1 : team.battles))
        : "0%"

    return (
        <main>
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    <h1>{team.teamName}</h1>
                    <div className="row-start-2 flex flex-col gap-2 md:flex-row lg:col-span-2">
                        <h2>{team?.teamStyle}</h2>
                        <div className="flex gap-2">
                            <div className="rounded-2xl bg-dark-2 px-4 py-1">
                                <h4 className="align-middle">
                                    Wins: {team.wins}
                                </h4>
                            </div>
                            <div className="rounded-2xl bg-dark-2 px-4 py-1">
                                <h4 className="align-middle">
                                    Percentage: {percentage}
                                </h4>
                            </div>
                            {session?.user?.id !== team.userId &&
                                session?.user && (
                                    <ActionButtons
                                        userId={session.user.id}
                                        team={team}
                                        favorite={teamFavorited}
                                    />
                                )}
                        </div>
                    </div>
                    {session?.user?.id === team.userId && session?.user && (
                        <div className="md:row-start-2">
                            <ActionButtons
                                userId={session.user.id}
                                team={team}
                                favorite={teamFavorited}
                            />
                        </div>
                    )}
                </div>
            </div>
            <TeamRow team={team} withStats={true} favorite={false} />
        </main>
    )
}

export default Team

interface ButtonProps {
    userId: string
    team: NonNullable<team>
    favorite?: boolean
}

const ActionButtons = ({ userId, team, favorite = false }: ButtonProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showBattleModal, setShowBattleModal] = useState(false)
    const [battleStatus, setBattleStatus] = useState<"Won" | "Lost">("Lost")

    const addFavoriteTeam = addFavoriteTeamMutation(team.id, userId, team)
    const removeFavoriteTeam = removeFavoriteTeamMutation(team.id, userId)

    const removeFavorite = () => {
        if (addFavoriteTeam.isLoading || removeFavoriteTeam.isLoading)
            return null
        removeFavoriteTeam.mutate({
            teamId: team.id,
        })
    }

    const addFavorite = () => {
        if (addFavoriteTeam.isLoading || removeFavoriteTeam.isLoading)
            return null

        addFavoriteTeam.mutate({
            teamId: team.id,
        })
    }

    const handleWin = () => {
        setShowBattleModal(true)
        setBattleStatus("Won")
    }

    const handleLose = () => {
        setShowBattleModal(true)
        setBattleStatus("Lost")
    }
    return (
        <>
            <div className="flex gap-3">
                {userId === team.userId && (
                    <>
                        <button
                            className="btn-red w-full rounded-2xl py-1"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete
                        </button>
                        <button
                            className="w-full rounded-2xl py-1"
                            onClick={handleLose}
                        >
                            Lost
                        </button>
                        <button
                            className="w-full rounded-2xl py-1"
                            onClick={handleWin}
                        >
                            Won
                        </button>
                    </>
                )}
                <FavoritedButton
                    favorited={favorite}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    absolute={false}
                />
            </div>
            {showDeleteModal && (
                <DeleteModal
                    userId={userId}
                    name={team.teamName}
                    setShowModal={setShowDeleteModal}
                    teamId={team.id}
                />
            )}
            {showBattleModal && (
                <BattleModal
                    setShowModal={setShowBattleModal}
                    teamId={team.id}
                    battleStatus={battleStatus}
                />
            )}
        </>
    )
}
