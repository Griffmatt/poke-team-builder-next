import { NavBar } from "../navbar"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { LoginModal } from "components/modals/loginModal"

interface Props {
    children: JSX.Element
}

export const Layout = ({ children }: Props) => {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const { status } = useSession()
    if (status === "loading") return null
    return (
        <>
            <Head>
                <title>Team Builder</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar setShowLoginModal={setShowLoginModal} />
            <div className="mx-auto max-w-screen-xl p-4">{children}</div>
            {showLoginModal && <LoginModal setShowModal={setShowLoginModal} />}
        </>
    )
}
