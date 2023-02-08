import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { teams } from "../types/trpc"
import { team } from "../types/trpc"
import { api } from "../utils/api"
import { PokemonCard } from "./pokemonGrids/cards/pokemonCard"
import { PokemonCardWithStats } from "./pokemonGrids/cards/pokemonCardWithStats"
import { SkeletonPokemonGrid } from "./pokemonGrids/ui/skeletonPokemonGrid"
import { FavoritedButton } from "./ui/favoritedButton"

interface TeamRows {
    teams: teams | null
    favoriteTeams?: string[] | null
    isLoading?: boolean
}

export const TeamRows = ({ teams, favoriteTeams, isLoading }: TeamRows) => {
    if (isLoading) {
        const fillerArr = Array.from({length: 5}, () => 0)
        return (
            <>
                {fillerArr.map(() => (
                    <>
                        <div className="h-6 w-32 bg-dark-2 animate-pulse" />
                        <SkeletonPokemonGrid amount={6} />
                    </>
                ))}
            </>
        )
    }

    return (
        <>
            {teams?.map((team) => {
                const favorited = favoriteTeams?.includes(team.id)
                return (
                    <div className="grid gap-3" key={team.id}>
                        <div className="flex items-center justify-between">
                            <h3>{team.teamName}</h3>
                            {favorited && (
                                <FavoritedButton
                                    favorited={favorited}
                                    absolute={false}
                                />
                            )}
                        </div>
                        <Link href={`/team/${team.id}`}>
                            <TeamRow team={team} withStats={false} />
                        </Link>
                    </div>
                )
            })}
        </>
    )
}

interface TeamRow {
    team: team
    withStats: boolean
}

export const TeamRow = ({ team, withStats }: TeamRow) => {
    const { data: session } = useSession()
    const { data: favoritePokemon } =
        api.favorite.checkUserFavoritePokemon.useQuery({
            userId: session?.user?.id ?? null,
        })

    return (
        <div
            className={`${
                withStats ? "grid gap-2 md:grid-cols-3" : "pokemon-card-grid"
            }`}
        >
            {team?.pokemon.map((pokemon) => {
                const favorite = favoritePokemon?.includes(pokemon.id) ?? false
                return (
                    <div className="pokemon-card" key={pokemon.id}>
                        {withStats ? (
                            <PokemonCardWithStats
                                createdPokemon={pokemon}
                                favorite={favorite}
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
