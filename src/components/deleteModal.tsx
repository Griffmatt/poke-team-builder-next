import router from "next/router"
import { api } from "../utils/api"

interface Props {
    userId: string
    name: string
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    teamId?: string
    pokemonId?: string
}

export default function DeleteModal({
    userId,
    name,
    showModal,
    setShowModal,
    teamId,
    pokemonId,
}: Props) {
    const apiContext = api.useContext()
    const deleteTeamMutation = api.teams.deleteTeam.useMutation({
        onMutate: async (variables) => {
            // Cancel current queries for the todos list

            // Create optimistic todo

            const pastTeams = apiContext.teams.getUserTeams.getData({
                userId: userId,
            })

            if (pastTeams) {
                apiContext.teams.getUserTeams.setData(
                    { userId: userId },
                    pastTeams.filter((team) => {
                        return team.id !== teamId
                    })
                )
            }
            return { pastTeams }
        },
        onSuccess: (result, variables, context) => {
            router.push(`/profile/${userId}/teams`)
        },
        onError: (error, variables, context) => {
            if (context?.pastTeams) {
                apiContext.teams.getUserTeams.setData(
                    { userId: userId },
                    context.pastTeams
                )
            }
        },
        onSettled: () => {
            apiContext.teams.getUserTeams.invalidate({ userId: userId })
        },
    })

    const handleDelete = () => {
        if (teamId)
            deleteTeamMutation.mutate({
                id: teamId,
            })
        if (pokemonId) return null
    }

    return (
        <div
            className={`fixed top-0 left-0  z-50 h-screen w-screen place-items-center bg-dark/50 ${
                showModal ? "grid grid-rows-3" : "hidden"
            }`}
            onClick={() => setShowModal(false)}
        >
            <div
                className="grid w-[90vw] max-w-[24rem] gap-4 rounded-xl bg-light p-10 dark:bg-dark"
                onClick={(event) => event?.stopPropagation()}
            >
                <h2>Confirm Delete</h2>
                <h3 className="text-center">
                    Are you sure you want to delete {name}?
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
                        onClick={handleDelete}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
