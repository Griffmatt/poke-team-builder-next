import { type NextPage } from "next"
import { BoxesNav } from "components/boxes/boxesNav"
import { CreatedPokemonGrid } from "components/pokemonGrids/createdPokemonGrid"
import { api } from "utils/api"
import { useSession } from "next-auth/react"
import { SkeletonTeamRows, TeamRows } from "components/teamRows"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"

const Boxes: NextPage = () => {
    const { data: session } = useSession()
    const {
        data: pokemons,
        isLoading,
        error,
    } = api.pokemon.recentPokemon.useQuery()
    const {
        data: favoritePokemon,
        isLoading: isLoading2,
        error: error2,
    } = api.favorite.checkUserFavoritePokemon.useQuery(
        {
            userId: session?.user?.id as string,
        },
        { enabled: !!session?.user?.id }
    )
    const {
        data: teams,
        isLoading: isLoading3,
        error: error3,
    } = api.teams.recentTeams.useQuery()

    const {
        data: favoriteTeams,
        isLoading: isLoading4,
        error: error4,
    } = api.favorite.checkUserFavoriteTeams.useQuery(
        {
            userId: session?.user?.id as string,
        },
        { enabled: !!session?.user?.id }
    )

    if (isLoading || isLoading2 || isLoading3 || isLoading4) {
        return (
            <main>
                <h1>Boxes</h1>
                <BoxesNav selected="pokemon" />
                <div className="grid gap-3">
                    <h2>Recent Pokemon</h2>
                    <SkeletonPokemonGrid />
                </div>
                <div className="grid gap-3">
                    <h2>Recent Teams</h2>
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
            <h1>Boxes</h1>
            <BoxesNav selected="pokemon" />
            <div className="grid gap-3">
                <h2>Recent Pokemon</h2>
                <CreatedPokemonGrid
                    pokemons={pokemons?.slice(0, 12)}
                    currentUserFavorites={favoritePokemon}
                />
            </div>
            <div className="grid gap-3">
                <h2>Recent Teams</h2>
                <TeamRows teams={teams} favoriteTeams={favoriteTeams} />
            </div>
        </main>
    )
}

export default Boxes
