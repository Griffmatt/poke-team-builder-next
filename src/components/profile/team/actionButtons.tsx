import { DeleteModal } from "components/modals/deleteModal"
import { useState } from "react"
import { FavoritedButton } from "components/ui/favoritedButton"
import { BattleModal } from "components/modals/battleModal"
import { addFavoriteTeamMutation } from "mutations/addFavoriteTeam"
import { removeFavoriteTeamMutation } from "mutations/removeFavoriteTeam"
import { type team } from "types/trpc"
import { api } from "utils/api"

interface Props {
    userId: string
    team: NonNullable<team>
}

export const ActionButtons = ({ userId, team }: Props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showBattleModal, setShowBattleModal] = useState(false)
    const [battleStatus, setBattleStatus] = useState<"Won" | "Lost">("Lost")

    const { data: favoriteTeams } =
        api.favorite.checkUserFavoriteTeams.useQuery({
            userId: userId,
        })

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

    const favorite = favoriteTeams?.includes(team?.id ?? "")
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
                <div className="flex items-center">
                    {favorite !== undefined ? (
                        <FavoritedButton
                            favorited={favorite}
                            addFavorite={addFavorite}
                            removeFavorite={removeFavorite}
                            absolute={false}
                        />
                    ) : (
                        <div className="w-8" />
                    )}
                </div>
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
