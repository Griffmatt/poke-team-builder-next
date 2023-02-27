import { NavLink } from "./ui/navLink"
import { signIn, useSession } from "next-auth/react"

interface NavBarProps {
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavBar = ({ setShowLoginModal }: NavBarProps) => {
    const { data: session } = useSession()

    return (
        <nav className="sticky top-0 z-50 bg-dark/95">
            <div className="mx-auto flex max-w-[40rem] justify-center gap-3 p-3 sm:gap-6">
                <NavLink href="/">
                    <h2>Home</h2>
                </NavLink>
                <NavLink href="/build/pokemon">
                    <h2>Build</h2>
                </NavLink>
                <NavLink href="/boxes">
                    <h2>Boxes</h2>
                </NavLink>
                {session?.user ? (
                    <NavLink href={`/profile/${session?.user?.id}`}>
                        <h2>Profile</h2>
                    </NavLink>
                ) : (
                    <button
                        className="btn-transparent"
                        onClick={() => void signIn(" ", { callbackUrl: "/" })}
                    >
                        <h2>Sign In</h2>
                    </button>
                )}
            </div>
        </nav>
    )
}
