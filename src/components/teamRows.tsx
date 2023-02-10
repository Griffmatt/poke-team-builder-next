import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { teams } from "../types/trpc"
import { team } from "../types/trpc"
import { api } from "../utils/api"
import { PokemonCard } from "./pokemonCards/pokemonCard"
import { PokemonCardWithStats } from "./pokemonCards/pokemonCardWithStats"
import { SkeletonPokemonGrid } from "./pokemonGrids/ui/skeletonPokemonGrid"

interface TeamRows {
    teams: teams
    favoriteTeams?: string[]
    query?: string
    userId?: string
    userName?: string | null
}

export const TeamRows = ({
    teams,
    favoriteTeams,
    query,
    userId,
    userName,
}: TeamRows) => {
    return (
        <>
            {teams.length === 0 ? (
                <TeamsEmpty query={query} userId={userId} userName={userName} />
            ) : (
                teams.map((team) => {
                    const favorited = favoriteTeams?.includes(team.id)
                    return (
                        <div className="grid gap-3" key={team.id}>
                            <h3>{team.teamName}</h3>
                            <Link href={`/team/${team.id}`}>
                                <TeamRow
                                    team={team}
                                    withStats={false}
                                    favorite={favorited ?? false}
                                />
                            </Link>
                        </div>
                    )
                })
            )}
        </>
    )
}

interface TeamRow {
    team: team
    withStats: boolean
    favorite: boolean
}

export const TeamRow = ({ team, withStats, favorite }: TeamRow) => {
    const { data: session } = useSession()
    const { data: favoritePokemon } =
        api.favorite.checkUserFavoritePokemon.useQuery(
            {
                userId: session?.user?.id as string,
            },
            { enabled: !!session?.user?.id }
        )

    return (
        <div
            className={`${
                withStats ? "grid gap-2 md:grid-cols-3" : "pokemon-card-grid"
            }`}
        >
            {team?.pokemon.map((pokemon) => {
                const favorited = favoritePokemon?.includes(pokemon.id) ?? false
                return (
                    <div
                        className={`pokemon-card ${favorite && "favorite"}`}
                        key={pokemon.id}
                    >
                        {withStats ? (
                            <PokemonCardWithStats
                                createdPokemon={pokemon}
                                favorite={favorited}
                            />
                        ) : (
                            <PokemonCard
                                pokemonName={pokemon.name}
                                createdPokemon={pokemon}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export const SkeletonTeamRows = () => {
    const fillerArr = Array.from({ length: 5 }, () => 0)
    return (
        <>
            {fillerArr.map((_, index) => (
                <React.Fragment key={index}>
                    <SkeletonTeamRow />
                </React.Fragment>
            ))}
        </>
    )
}

export const SkeletonTeamRow = () => {
    return (
        <div className="grid gap-3">
            <div className="h-6 w-32 animate-pulse bg-dark-2" />
            <SkeletonPokemonGrid amount={6} />
        </div>
    )
}

const TeamsEmpty = ({
    query,
    userId,
    userName,
}: {
    query?: string
    userId?: string
    userName?: string | null
}) => {
    const { data: session } = useSession()
    const className =
        "mx-auto grid aspect-[2] w-80 place-items-center rounded-2xl p-6 text-center dark:bg-dark-2"
    if (query) {
        return (
            <div className={className}>
                <h2>There were no results for your query</h2>
                <h3>{query}</h3>
            </div>
        )
    }

    if (userId === session?.user?.id) {
        return (
            <div className={className}>
                <h2>You haven't built any Teams yet!</h2>
                <Link href="/build/team">
                    Click here to view build team
                </Link>
            </div>
        )
    }

    return (
        <div className={className}>
            <h2>
                {userName ?? "They"} ${userName ? "hasn't" : "haven't"} created
                any Teams yet!
            </h2>
        </div>
    )
}
