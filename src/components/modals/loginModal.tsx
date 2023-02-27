interface LoginModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginModal = ({ setShowModal }: LoginModalProps) => {
    return (
        <div
            className="fixed top-0 left-0  z-50 flex h-screen w-screen items-center justify-center bg-light/5"
            onClick={() => setShowModal(false)}
        >
            <div
                className="grid w-[90vw] max-w-[24rem] gap-4 rounded-xl bg-light bg-dark p-10"
                onClick={(event) => event?.stopPropagation()}
            >
                <h2>Login In</h2>
            </div>
        </div>
    )
}
