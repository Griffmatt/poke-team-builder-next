import { deletePokemonMutation } from "../mutations/deletePokemonMutation"
import { deleteTeamMutation } from "../mutations/deleteTeamMutation"

interface Props {
    userId: string
    name: string
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    teamId?: string
    pokemonId?: string
    pokemonTeams?: string[]
}

export default function DeleteModal({
    userId,
    name,
    showModal,
    setShowModal,
    teamId,
    pokemonId,
    pokemonTeams
}: Props) {
    const deleteTeam = deleteTeamMutation(userId, teamId as string)
    const deletePokemon = deletePokemonMutation(userId, pokemonId as string, name, pokemonTeams)

    const handleDelete = () => {
        if (teamId)
            deleteTeam.mutate({
                id: teamId,
            })
        if (pokemonId) deletePokemon.mutate({
            pokemonId: pokemonId,
            pokemonTeams: pokemonTeams as string[]
        })
    }

    return (
        <div
            className={`fixed top-0 left-0  z-50 h-screen w-screen place-items-center bg-dark/50 ${
                showModal ? "grid grid-rows-3" : "hidden"
            }`}
            onClick={() => setShowModal(false)}
        >
            <div
                className="grid w-[90vw] max-w-[24rem] gap-4 rounded-xl bg-light p-10 dark:bg-dark-2"
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
