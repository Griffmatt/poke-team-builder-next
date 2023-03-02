import { signIn } from "next-auth/react"
import { Modal } from "./modal"

interface LoginModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignInModal = ({ setShowModal }: LoginModalProps) => {
    return (
        <Modal setShowModal={setShowModal}>
            <h2>Sign In</h2>
            <button
                className="w-full rounded-2xl py-2 px-4"
                onClick={() => void signIn("discord", { callbackUrl: "/" })}
            >
                Sign in with Discord
            </button>
            <button
                className="w-full rounded-2xl py-2 px-4"
                onClick={() => void signIn("google", { callbackUrl: "/" })}
            >
                Sign in with Google
            </button>
            <button
                className="w-full  rounded-2xl py-2 px-4"
                onClick={() => setShowModal(false)}
            >
                Sign in as Test User
            </button>
        </Modal>
    )
}
