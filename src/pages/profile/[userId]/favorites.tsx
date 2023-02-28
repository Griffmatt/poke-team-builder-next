import { FavoritePokemon } from "components/profile/favorites/pokemon"
import { FavoriteTeams } from "components/profile/favorites/teams"
import { ProfileNav } from "components/profile/profileNav"

import { type NextPage } from "next"
import React from "react"

const Favorites: NextPage = () => {
    return (
        <main>
            <ProfileNav selected="favorites" />
            <FavoritePokemon />
            <FavoriteTeams />
        </main>
    )
}

export default Favorites
