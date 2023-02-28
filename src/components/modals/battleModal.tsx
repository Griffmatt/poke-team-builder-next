import { api } from "utils/api"
import { Modal } from "./modal"

interface Props {
    teamId: string
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    battleStatus: "Lost" | "Won"
}

export const BattleModal = ({ setShowModal, teamId, battleStatus }: Props) => {
    const apiContext = api.useContext()

    const won = battleStatus === "Won" ? 1 : 0
    const battleMutation = api.teams.addBattle.useMutation({
        onMutate: () => {
            const teamData = apiContext.teams.getTeam.getData({
                teamId: teamId,
            })
            if (teamData) {
                apiContext.teams.getTeam.setData(
                    {
                        teamId: teamId,
                    },
                    {
                        ...teamData,
                        wins: teamData.wins + won,
                        battles: teamData.battles + 1,
                    }
                )
            }
            return { teamData }
        },
        onSuccess: () => {
            setShowModal(false)
        },
        onError: (error, variables, context) => {
            apiContext.teams.getTeam.setData(
                { teamId: teamId },
                context?.teamData
            )
        },
        onSettled: () => {
            void apiContext.teams.getTeam.invalidate()
        },
    })

    const handleUpdate = () => {
        const battleWon = battleStatus === "Won"
        battleMutation.mutate({
            teamId: teamId,
            won: battleWon,
        })
    }

    return (
        <Modal setShowModal={setShowModal}>
            <h2>Confirm Battle</h2>
            <h3 className="text-center">
                Are you sure you {battleStatus} the battle? You will not be able
                to revert this change!
            </h3>
            <div className="flex justify-around">
                <button
                    className="w-fit rounded-2xl py-2 px-4"
                    onClick={() => setShowModal(false)}
                >
                    Cancel
                </button>
                <button
                    className="btn-red w-fit rounded-2xl py-2 px-4"
                    onClick={handleUpdate}
                    disabled={battleMutation.isLoading}
                >
                    Confirm
                </button>
            </div>
        </Modal>
    )
}
