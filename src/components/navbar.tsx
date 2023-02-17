import { NavLink } from "./ui/navLink"
import { signIn, useSession } from "next-auth/react"
import { Button } from "./ui/button"

export const NavBar = () => {
    const { data: session } = useSession()

    return (
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
                <Button
                    color="bg-transparent"
                    text="Sign In"
                    onClick={() => void signIn("", { callbackUrl: "/" })}
                />
            )}
        </div>
    )
}
