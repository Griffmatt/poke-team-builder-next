import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"
import { ProfileNav } from "components/profile/profileNav"
import { TeamRows } from "components/teams/teamRows"
import { SkeletonTeamRows } from "components/teams/ui/skeletonTeamRows"

import { type NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { api } from "utils/api"

const Favorites: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query

    const {
        data: pokemons,
        isLoading,
        error,
    } = api.favorite.getUserFavoritePokemon.useQuery({
        userId: userId as string,
    })

    const {
        data: user,
        isLoading: isLoading2,
        error: error2,
    } = api.users.getUser.useQuery({ userId: userId as string })

    const {
        data: teams,
        isLoading: isLoading3,
        error: error3,
    } = api.favorite.getUserFavoriteTeams.useQuery({
        userId: userId as string,
    })

    const {
        data: favoriteTeams,
        isLoading: isLoading4,
        error: error4,
    } = api.favorite.checkUserFavoriteTeams.useQuery({
        userId: userId as string,
    })
    if (isLoading || isLoading2 || isLoading3 || isLoading4) {
        return (
            <main aria-label="Loading">
                <ProfileNav
                    selected="favorites"
                    userId={userId as string}
                    user={user}
                />
                <div className="grid gap-3">
                    <h2>Pokemon</h2>
                    <SkeletonPokemonGrid />
                </div>
                <div className="grid gap-3">
                    <h2>Teams</h2>
                    <SkeletonTeamRows />
                </div>
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>
    if (error3) return <div>Error: {error3.message}</div>
    if (error4) return <div>Error: {error4.message}</div>

    return (
        <main>
            <ProfileNav
                selected="favorites"
                userId={userId as string}
                user={user}
            />
            <section className="grid gap-3">
                <h2>Pokemon</h2>
                <CreatedPokemonGrid
                    pokemons={pokemons}
                    favoriteGrid={true}
                    userId={userId as string}
                    profileGrid={true}
                />
            </section>
            <section className="grid gap-3">
                <h2>Teams</h2>

                <TeamRows
                    teams={teams}
                    favoriteTeams={favoriteTeams}
                    favoriteRows={true}
                    userId={userId as string}
                />
            </section>
        </main>
    )
}

export default Favorites
