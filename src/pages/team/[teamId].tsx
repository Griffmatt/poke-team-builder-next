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
import { useDebounceFavorite } from "hooks/useDebounceFavorite"

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
    const teamFavorited = favoriteTeams?.includes(team?.id ?? "")

    return (
        <>
            {team && (
                <main>
                    <BackButton />
                    <div className="flex items-center justify-between">
                        <div className="grid gap-2">
                            <h1>{team.teamName}</h1>
                            <div className="flex gap-2">
                                <h2>{team.teamStyle}</h2>
                                <div className="rounded-2xl bg-dark-2 px-4 py-1">
                                    <h4 className="align-middle">
                                        Total Wins: {team.wins}
                                    </h4>
                                </div>
                                <div className="rounded-2xl bg-dark-2 px-4 py-1">
                                    <h4 className="align-middle">
                                        Win Percentage:{" "}
                                        {formatPercentage(
                                            team.wins /
                                                (team.battles === 0
                                                    ? 1
                                                    : team.battles)
                                        )}
                                    </h4>
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
            )}
        </>
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
    team: team
    favorite: boolean
}

const ActionButtons = ({ userId, team, favorite }: ButtonProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showBattleModal, setShowBattleModal] = useState(false)
    const [favorited, setFavorited] = useState<boolean | null>(null)
    const [battleStatus, setBattleStatus] = useState<"Won" | "Lost">("Lost")

    const copyTeam = api.teams.buildTeam.useMutation()

    const addFavoriteTeam = addFavoriteTeamMutation(team!.id, userId, team)
    const removeFavoriteTeam = removeFavoriteTeamMutation(team!.id, userId)

    const handleCopy = () => {
        const pokemonIds = team?.pokemon.map((pokemon) => {
            return { pokemonId: pokemon.id }
        })
        copyTeam.mutate({
            userId: userId,
            teamName: team!.teamName,
            teamStyle: team!.teamStyle,
            originalTrainerId: team?.userId,
            pokemon: pokemonIds ?? [],
        })
    }

    const favoritedTeam = useDebounceFavorite(
        favorited,
        favorite,
        addFavoriteTeam,
        removeFavoriteTeam,
        {
            teamId: team!.id,
            userId: userId,
        }
    )

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
                {userId === team!.userId ? (
                    <>
                        <button
                            className="btn-red h-fit rounded-2xl px-4 py-2"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete
                        </button>
                        <button
                            className="h-fit rounded-2xl px-4 py-2"
                            onClick={handleLose}
                        >
                            Lost
                        </button>
                        <button
                            className="h-fit rounded-2xl px-4 py-2"
                            onClick={handleWin}
                        >
                            Won
                        </button>
                    </>
                ) : (
                    <button
                        className="h-fit rounded-2xl px-4 py-2"
                        onClick={handleCopy}
                    >
                        Copy Team
                    </button>
                )}
                <FavoritedButton
                    favorited={favoritedTeam}
                    handleFavorite={() => setFavorited(!favoritedTeam)}
                    absolute={false}
                />
            </div>
            <DeleteModal
                userId={userId}
                name={team!.teamName}
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                teamId={team!.id}
            />
            <BattleModal
                showModal={showBattleModal}
                setShowModal={setShowBattleModal}
                teamId={team!.id}
                battleStatus={battleStatus}
            />
        </>
    )
}
