import { api } from "utils/api"

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
            const teamData = apiContext.teams.getTeam.getData()
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
            apiContext.teams.getTeam.invalidate()
        },
    })

    const handleUpdate = () => {
        if(battleMutation.isLoading){
            return
        }
        const battleWon = battleStatus === "Won"
        battleMutation.mutate({
            teamId: teamId,
            won: battleWon,
        })
    }

    return (
        <div
            className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-light/5"
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
