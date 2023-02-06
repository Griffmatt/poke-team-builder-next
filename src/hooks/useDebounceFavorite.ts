import { type addFavoritePokemonMutation } from "mutations/addFavoritePokemonMutation"
import { type addFavoriteTeamMutation } from "mutations/addFavoriteTeam"
import { type removeFavoritePokemonMutation } from "mutations/removeFavoritePokemonMutation"
import { type removeFavoriteTeamMutation } from "mutations/removeFavoriteTeam"
import { useEffect } from "react"

let timer: NodeJS.Timeout | undefined

type Add =
    | ReturnType<typeof addFavoritePokemonMutation>
    | ReturnType<typeof addFavoriteTeamMutation>

type Remove =
    | ReturnType<typeof removeFavoritePokemonMutation>
    | ReturnType<typeof removeFavoriteTeamMutation>

type IdTypes = { userId: string, pokemonId: string } | { userId: string, teamId: string }
    

type Ids<T> = T extends { userId: string; pokemonId: string } ? { userId: string; pokemonId: string } : { userId: string; teamId: string }

export const useDebounceFavorite = <T extends IdTypes>(
    favorited: boolean | null,
    favorite: boolean,
    addFavorite: Add,
    removeFavorite: Remove,
    ids: Ids<T>,
    time = 1000
) => {
    const handleFavorite = () => {
        if (!ids?.userId) return null
        if (addFavorite.isLoading || removeFavorite.isLoading) return null
        if (favorite === favorited) return
        favorited ? addFavorite.mutate(ids) : removeFavorite.mutate(ids)
    }

    useEffect(() => {
        if (favorited === null) return
        clearTimeout(timer)
        timer = setTimeout(handleFavorite, time)
    }, [favorited])

    return favorited ?? favorite
}
