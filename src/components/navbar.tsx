import NavLink from './navLink'
import { signIn, useSession } from 'next-auth/react'

export default function NavBar() {
    const { data } = useSession()
    const user = data?.user

    if (user === undefined) return null

    return (
        <div className="mx-auto flex max-w-[40rem] justify-around p-3 sticky">
            <NavLink href="/">
                <h2>Home</h2>
            </NavLink>
            <NavLink href="/pokemon">
                <h2>Pokemon</h2>
            </NavLink>
            <NavLink href="/teams">
                <h2>Teams</h2>
            </NavLink>
            {user ? (
                <NavLink href={`/boxes/${user.id}`}>
                    <h2>Boxes</h2>
                </NavLink>
            ) : (
                <button
                    className="bg-transparent text-dark dark:text-light"
                    onClick={() => signIn()}
                >
                    Login
                </button>
            )}
        </div>
    )
}
