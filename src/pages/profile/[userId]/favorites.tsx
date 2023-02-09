import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"
import { ProfileNav } from "components/profile/profileNav"
import { TeamRows } from "components/teamRows"
import { type NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { api } from "utils/api"

const Favorites: NextPage = () => {
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
                <h2>Pokemon</h2>
                <CreatedPokemonGrid pokemons={pokemons ?? null} />
            </div>
            <div className="grid gap-3">
                <h2>Teams</h2>
                <TeamRows
                    teams={teams ?? null}
                    favoriteTeams={favoriteTeams ?? []}
                    isLoading={isLoading}
                />
            </div>
        </main>
    )
}

export default Favorites
