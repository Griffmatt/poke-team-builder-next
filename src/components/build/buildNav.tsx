import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { type Dispatch, type SetStateAction, useState } from "react"

interface Props {
    selected: "pokemon" | "team"
}

const BuildNav = ({ selected }: Props) => {
    const { data: session } = useSession()
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="flex justify-center gap-2">
            <Link href={"/build/pokemon"}>
                <h3 className={selected === "pokemon" ? "border-b-2" : ""}>
                    Pokemon
                </h3>
            </Link>
            {session?.user ? (
                <Link href={"/build/team"}>
                    <h3 className={selected === "team" ? "border-b-2" : ""}>
                        Team
                    </h3>
                </Link>
            ) : (
                <button
                    onClick={() => setShowModal(true)}
                    className="btn-transparent"
                >
                    <h3 className={selected === "team" ? "border-b-2" : ""}>
                        Team
                    </h3>
                </button>
            )}
            <LoginModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export { BuildNav }

const LoginModal = ({
    showModal,
    setShowModal,
}: {
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
}) => {
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
                <h2>Login to build team</h2>
                <button
                    onClick={() => signIn()}
                    className="mx-auto w-fit rounded-2xl py-2 px-4"
                >
                    Log In
                </button>
            </div>
        </div>
    )
}
