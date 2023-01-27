import { NavLink } from "./ui/navLink"
import { signIn, useSession } from "next-auth/react"

const NavBar = () => {
    const { data } = useSession()
    const user = data?.user

    return (
        <div className="mx-auto flex max-w-[40rem] justify-center gap-6  p-3">
            <NavLink href="/">
                <h2>Home</h2>
            </NavLink>
            <NavLink href="/build/pokemon">
                <h2>Build</h2>
            </NavLink>
            <NavLink href="/boxes">
                <h2>Boxes</h2>
            </NavLink>
            {user ? (
                <NavLink href={`/profile/${user.id}`}>
                    <h2>Profile</h2>
                </NavLink>
            ) : (
                <button className="bg-transparent" onClick={() => signIn()}>
                    <h2>Sign In</h2>
                </button>
            )}
        </div>
    )
}

export { NavBar }
