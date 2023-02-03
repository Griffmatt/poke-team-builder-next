import { NavLink } from "./ui/navLink"
import { signIn, useSession } from "next-auth/react"

export const NavBar = () => {
    const { data: session } = useSession()

    return (
        <div className="mx-auto flex max-w-[40rem] justify-center gap-6 p-3">
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
                <button className="btn-transparent" onClick={() => signIn()}>
                    <h2>Sign In</h2>
                </button>
            )}
        </div>
    )
}
