import { Modal } from "./modal"

interface LoginModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginModal = ({ setShowModal }: LoginModalProps) => {
    return (
        <Modal setShowModal={setShowModal}>
            <h2>Login In</h2>
        </Modal>
    )
}
