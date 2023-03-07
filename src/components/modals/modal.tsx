import FocusTrap from "focus-trap-react"
import { type ReactNode } from "react"

interface ModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
}

export const Modal = ({ setShowModal, children }: ModalProps) => {
    return (
        <FocusTrap>
            <div
                className="fixed top-0 left-0  z-50 flex h-screen w-screen items-center justify-center bg-light/5"
                onClick={() => setShowModal(false)}
            >
                <div
                    className="grid w-[90vw] max-w-[24rem] gap-4 rounded-xl bg-dark p-6"
                    onClick={(event) => event?.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </FocusTrap>
    )
}
