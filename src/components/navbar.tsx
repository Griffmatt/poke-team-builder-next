import NavLink from './navLink'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function NavBar() {
    const { data } = useSession()
    const user = data?.user

    return (
        <div className="mx-auto flex max-w-[40rem] justify-around p-3">
            <NavLink href="/">
                <h2>Home</h2>
            </NavLink>
            <NavLink href="/pokemon">
                <h2>Pokemon</h2>
            </NavLink>
            <NavLink href="/teams">
                <h2>Teams</h2>
            </NavLink>
            <NavLink href={`${user? `/boxes/${user.id}`: null}`}>
                <h2>Boxes</h2>
            </NavLink>
            {user ? (
                <button className="bg-transparent" onClick={() => signOut()}>
                    <h2>Sign Out</h2>
                </button>
            ) : (
                <button className="bg-transparent" onClick={() => signIn()}>
                    <h2>Sign In</h2>
                </button>
            )}
        </div>
    )
}
