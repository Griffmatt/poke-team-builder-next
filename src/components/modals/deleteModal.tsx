import { deletePokemonMutation } from "mutations/deletePokemonMutation"
import { deleteTeamMutation } from "mutations/deleteTeamMutation"
import { Modal } from "./modal"

interface Props {
    userId: string
    name: string
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    teamId?: string
    pokemonId?: string
    pokemonTeams?: string[]
}

export const DeleteModal = ({
    userId,
    name,
    setShowModal,
    teamId,
    pokemonId,
    pokemonTeams,
}: Props) => {
    const deleteTeam = deleteTeamMutation(userId, teamId as string)
    const deletePokemon = deletePokemonMutation(
        userId,
        pokemonId as string,
        name,
        pokemonTeams
    )

    const handleDelete = () => {
        if (teamId)
            deleteTeam.mutate({
                id: teamId,
            })
        if (pokemonId)
            deletePokemon.mutate({
                pokemonId: pokemonId,
                pokemonTeams: pokemonTeams as string[],
            })
    }

    return (
        <Modal setShowModal={setShowModal}>
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
                    disabled={deletePokemon.isLoading}
                >
                    Confirm
                </button>
            </div>
        </Modal>
    )
}
