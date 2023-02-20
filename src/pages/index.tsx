import { type NextPage } from "next"
import { api } from "utils/api"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { PokemonDataGrid } from "components/pokemonGrids/pokemonDataGrid"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"
import { SkeletonTeamRows } from "components/teams/ui/skeletonTeamRows"
import { TeamRows } from "components/teams/teamRows"

const Home: NextPage = () => {
    const {
        data: pokemonData,
        isLoading,
        error,
    } = api.statistics.getTopPokemon.useQuery()

    if (isLoading) {
        return (
            <main>
                <h1>Statistics</h1>
                <div className="grid gap-3">
                    <h2>Trending Pokemon</h2>
                    <SkeletonPokemonGrid amount={12} dataGrid={true} />
                </div>
                <div className="grid gap-3">
                    <HomepageButtons />
                    <div className="grid gap-3">
                        <h2>Team of the Week</h2>
                        <p>Coming soon!</p>
                    </div>
                </div>
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>

    return (
        <main>
            <h1>Statistics</h1>
            <div className="grid gap-3">
                <h2>Trending Pokemon</h2>
                <PokemonDataGrid pokemonData={pokemonData} amount={12} />
            </div>
            <div className="grid gap-3">
                <HomepageButtons />
                <TeamOfTheWeek />
            </div>
        </main>
    )
}

export default Home

const HomepageButtons = () => {
    const { data: session } = useSession()
    const buttonClassName =
        "flex aspect-[4/2] items-center justify-center rounded-2xl dark:bg-dark-2 dark:hover:bg-dark-3 w-60 shadow-md shadow-black"
    return (
        <>
            <h2>What to do?</h2>
            <div className="flex flex-col items-center justify-center gap-2 xs:flex-row">
                <Link href={"/build/pokemon"} className={buttonClassName}>
                    <h2>Build Pokemon</h2>
                </Link>
                {session?.user ? (
                    <>
                        <Link href={"/build/team"} className={buttonClassName}>
                            <h2>Build Team</h2>
                        </Link>
                        <Link
                            href={`/profile/${session?.user.id}`}
                            className={buttonClassName}
                        >
                            <h2>View Profile</h2>
                        </Link>
                    </>
                ) : (
                    <>
                        <div
                            onClick={() => void signIn()}
                            className={buttonClassName}
                        >
                            <h2>Sign In</h2>
                        </div>
                        <Link href={`/boxes`} className={buttonClassName}>
                            <h2>View Boxes</h2>
                        </Link>
                    </>
                )}
            </div>
        </>
    )
}

const TeamOfTheWeek = () => {
    const { data: team, isLoading, error } = api.teams.teamOfTheWeek.useQuery()

    if (isLoading)
        return (
            <div className="grid gap-3">
                <h2>Team of the Week</h2> <SkeletonTeamRows rows={1} />
            </div>
        )

    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="grid gap-3">
            <h2>Team of the Week</h2>
            <TeamRows teams={team} />
        </div>
    )
}
