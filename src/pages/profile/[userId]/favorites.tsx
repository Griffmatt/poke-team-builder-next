import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"
import { ProfileNav } from "components/profile/profileNav"
import { TeamRows } from "components/teamRows"
import { useRouter } from "next/router"
import React from "react"
import { api } from "utils/api"

const favorites = () => {
    const router = useRouter()
    const { userId } = router.query

    const { data: pokemons } = api.favorite.getUserFavoritePokemon.useQuery({
        userId: userId as string,
    })

    const { data: user } = api.users.getUser.useQuery({
        userId: userId as string,
    })

    const { data: teams, isLoading: teamsLoading } =
        api.teams.recentTeams.useQuery()

    const { data: favoriteTeams, isLoading: favoritesLoading } =
        api.favorite.checkUserFavoriteTeams.useQuery({
            userId: userId as string,
        })

    const isLoading = teamsLoading || favoritesLoading

    return (
        <main>
            <ProfileNav
                selected="favorites"
                userId={userId as string}
                user={user}
            />
            <div className="grid gap-3">
                <h2>pokemon</h2>
                <CreatedPokemonGrid pokemons={pokemons ?? null} />
                <h2>Teams</h2>
                <div>
                    <TeamRows
                        teams={teams ?? null}
                        favoriteTeams={favoriteTeams ?? []}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </main>
    )
}

export default favorites
