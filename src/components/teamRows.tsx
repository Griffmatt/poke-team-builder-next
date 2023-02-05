import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { teams } from "../types/trpc"
import { team } from "../types/trpc"
import { api } from "../utils/api"
import { PokemonCard } from "./pokemonCard"
import { PokemonCardWithStats } from "./pokemonCardWithStats"
import { FavoritedButton } from "./ui/favoritedButton"

interface TeamRows {
    teams: teams
    favoriteTeams: string[]
}

export const TeamRows = ({ teams, favoriteTeams }: TeamRows) => {
    return (
        <>
            {teams?.map((team) => {
                const favorited = favoriteTeams?.includes(team.id)
                return (
                    <React.Fragment key={team.id}>
                        <div className="flex justify-between">
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
                    </React.Fragment>
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
                withStats
                    ? "grid gap-2 md:grid-cols-3"
                    : "pokemon-card-grid"
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
