import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { api } from "utils/api"
import Link from "next/link"
import { DeleteModal } from "components/modals/deleteModal"
import { useState } from "react"
import { TeamRow } from "components/teamRows"
import { BackButton } from "components/ui/backButton"
import { FavoritedButton } from "components/ui/favoritedButton"
import { BattleModal } from "components/modals/battleModal"
import { formatPercentage } from "utils/formatPercentage"
import { addFavoriteTeamMutation } from "mutations/addFavoriteTeam"
import { removeFavoriteTeamMutation } from "mutations/removeFavoriteTeam"
import { team } from "types/trpc"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"

const Team: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const { teamId } = router.query

    const { data: team } = api.teams.getTeam.useQuery({
        teamId: teamId as string,
    })

    const { data: favoriteTeams } =
        api.favorite.checkUserFavoriteTeams.useQuery({
            userId: session?.user?.id as string,
        })

    if (team == null) {
        return (
            <main>
                <BackButton />
                <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                    <div className="grid w-full gap-2">
                        <div className="h-8 w-32 animate-pulse bg-dark-2" />
                        <div className="flex flex-col gap-2 md:flex-row">
                            <div className="h-8 w-32 animate-pulse bg-dark-2" />
                            <div className="h-8 w-32 animate-pulse bg-dark-2" />
                            <div className="h-8 w-32 animate-pulse bg-dark-2" />
                        </div>
                    </div>
                </div>
                <SkeletonPokemonGrid amount={6} withStats={true} />
            </main>
        )
    }
    const teamFavorited = favoriteTeams?.includes(team?.id ?? "")
    return (
        <main>
            <BackButton />
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                <div className="grid w-full gap-2">
                    <h1 className="w-fit">{team.teamName}</h1>
                    <div className="flex flex-col gap-2 md:flex-row">
                        <h2>{team.teamStyle}</h2>
                        <div className="flex gap-2">
                            <div className="rounded-2xl bg-dark-2 px-4 py-1">
                                <h4 className="align-middle">
                                    Wins: {team.wins}
                                </h4>
                            </div>
                            <div className="rounded-2xl bg-dark-2 px-4 py-1">
                                <h4 className="align-middle">
                                    Percentage:{" "}
                                    {formatPercentage(
                                        team.wins /
                                            (team.battles === 0
                                                ? 1
                                                : team.battles)
                                    )}
                                </h4>
                            </div>
                        </div>
                    </div>
                    {team.originalTrainerId && (
                        <OriginalTrainer id={team.originalTrainerId} />
                    )}
                </div>
                {session?.user && teamFavorited !== undefined && (
                    <ActionButtons
                        userId={session.user.id}
                        team={team}
                        favorite={teamFavorited}
                    />
                )}
            </div>
            <TeamRow team={team} withStats={true} />
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

interface ButtonProps {
    userId: string
    team: NonNullable<team>
    favorite: boolean
}

const ActionButtons = ({ userId, team, favorite }: ButtonProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showBattleModal, setShowBattleModal] = useState(false)
    const [battleStatus, setBattleStatus] = useState<"Won" | "Lost">("Lost")

    const copyTeam = api.teams.buildTeam.useMutation()

    const addFavoriteTeam = addFavoriteTeamMutation(team!.id, userId, team)
    const removeFavoriteTeam = removeFavoriteTeamMutation(team!.id, userId)

    const handleCopy = () => {
        const pokemonIds = team.pokemon.map((pokemon) => {
            return { pokemonId: pokemon.id }
        })
        copyTeam.mutate({
            userId: userId,
            teamName: team.teamName,
            teamStyle: team.teamStyle,
            originalTrainerId: team.userId,
            pokemon: pokemonIds,
        })
    }

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
            <div className="flex w-full justify-between gap-3 md:w-fit">
                {userId === team!.userId ? (
                    <>
                        <button
                            className="btn-red h-fit w-full rounded-2xl px-4 py-2"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete
                        </button>
                        <button
                            className="h-fit w-full rounded-2xl px-4 py-2"
                            onClick={handleLose}
                        >
                            Lost
                        </button>
                        <button
                            className="h-fit w-full rounded-2xl px-4 py-2"
                            onClick={handleWin}
                        >
                            Won
                        </button>
                    </>
                ) : (
                    <button
                        className="h-fit w-full rounded-2xl px-4 py-2"
                        onClick={handleCopy}
                    >
                        Copy Team
                    </button>
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
                    name={team!.teamName}
                    setShowModal={setShowDeleteModal}
                    teamId={team!.id}
                />
            )}
            {showBattleModal && (
                <BattleModal
                    setShowModal={setShowBattleModal}
                    teamId={team!.id}
                    battleStatus={battleStatus}
                />
            )}
        </>
    )
}
