import { api } from "utils/api"

interface Props {
    teamId: string
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    battleStatus: "Lost" | "Won"
}

export default function BattleModal({
    showModal,
    setShowModal,
    teamId,
    battleStatus,
}: Props) {
    const apiContext = api.useContext()
    const battleMutation = api.teams.addBattle.useMutation({
        onMutate: () => {
            const teamData = apiContext.teams.getTeam.getData()

            if (teamData) {
                const won = battleStatus === "Won" ? 1 : 0
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
            apiContext.teams.getTeam.invalidate()
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
        <div
            className={`fixed top-0 left-0  z-50 h-screen w-screen place-items-center bg-light/5 ${
                showModal ? "grid grid-rows-3" : "hidden"
            }`}
            onClick={() => setShowModal(false)}
        >
            <div
                className="grid w-[90vw] max-w-[24rem] gap-4 rounded-xl bg-light p-10 dark:bg-dark"
                onClick={(event) => event?.stopPropagation()}
            >
                <h2>Confirm Battle</h2>
                <h3 className="text-center">
                    Are you sure you {battleStatus} the battle? You will not be
                    able to revert this change!
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
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
