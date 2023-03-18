import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { api } from "utils/api"
import { formatPercentage } from "utils/formatPercentage"
import { TeamRow } from "components/teams/teamRow"
import { SkeletonPokemonGridWithStats } from "components/pokemonGrids/ui/skeletonPokemonGridWithStats"
import { ActionButtons } from "components/profile/team/actionButtons"
import Link from "next/link"

const Team: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const { teamId } = router.query

    const {
        data: team,
        isLoading,
        error,
    } = api.teams.getTeam.useQuery({
        teamId: teamId as string,
    })

    if (isLoading) {
        return (
            <main aria-label="Loading">
                <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                        <h1 className="h-8 w-36 animate-pulse bg-dark-2" />
                        <div className="row-start-2 flex flex-col gap-2 md:flex-row lg:col-span-2">
                            <h2 className="h-7 w-16 animate-pulse bg-dark-2 md:h-8" />
                            <div className="flex gap-2">
                                <div className="h-7 w-24 animate-pulse bg-dark-2 md:h-8" />
                                <div className="h-7 w-44 animate-pulse bg-dark-2 md:h-8" />
                            </div>
                        </div>
                    </div>
                </div>
                <SkeletonPokemonGridWithStats amount={6} />
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>

    if (team === null) return <div>Team not found!</div>

    const percentage = team
        ? formatPercentage(team.wins / (team.battles === 0 ? 1 : team.battles))
        : "0%"

    return (
        <main>
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    <Link href={`/profile/${team.userId}`}>
                        <h1>{team.teamName}</h1>
                    </Link>
                    <div className="row-start-2 flex flex-col gap-2 md:flex-row lg:col-span-2">
                        <h2>{team?.teamStyle}</h2>
                        <div className="flex gap-2">
                            <div className="flex items-center rounded-2xl bg-dark-2 px-4 py-1">
                                <h3>Wins: {team.wins}</h3>
                            </div>
                            <div className="flex items-center rounded-2xl bg-dark-2 px-4 py-1">
                                <h3>Percentage: {percentage}</h3>
                            </div>
                        </div>
                    </div>
                    {session?.user?.id && (
                        <div className="md:row-start-2">
                            <ActionButtons
                                userId={session.user.id}
                                team={team}
                            />
                        </div>
                    )}
                </div>
            </div>
            <TeamRow team={team} withStats={true} favorite={false} />
        </main>
    )
}

export default Team
