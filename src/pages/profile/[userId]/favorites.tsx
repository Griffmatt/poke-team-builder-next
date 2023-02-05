import { PokemonCard } from "components/pokemonCard"
import { ProfileNav } from "components/profile/profileNav"
import { TeamRows } from "components/teamRows"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { api } from "utils/api"

const favorites = () => {
    const router = useRouter()
    const { userId } = router.query

    const { data: teams } = api.favorite.getUserFavoriteTeams.useQuery({
        userId: userId as string,
    })

    const { data: pokemons } = api.favorite.getUserFavoritePokemon.useQuery({
        userId: userId as string,
    })

    const { data: user } = api.users.getUser.useQuery({
        userId: userId as string,
    })

    const { data: favoriteTeams } =
        api.favorite.checkUserFavoriteTeams.useQuery({
            userId: userId as string,
        })

    return (
        <main>
            <ProfileNav
                selected={"favorites"}
                userId={userId as string}
                user={user}
            />
            <div className="grid gap-3">
                <h2>pokemon</h2>
                <div className="pokemon-card-grid">
                    {pokemons?.map((pokemon) => {
                        const { name, id } = pokemon?.createdPokemon
                        return (
                            <Link
                                key={id}
                                href={`/profile/${user?.id}/${id}`}
                                className="pokemon-card"
                            >
                                <PokemonCard
                                    pokemonName={name}
                                    createdPokemon={pokemon.createdPokemon}
                                    favorite={true}
                                />
                            </Link>
                        )
                    })}
                </div>
                <h2>Teams</h2>
                <div>
                    {teams && (
                        <TeamRows
                            teams={teams}
                            favoriteTeams={favoriteTeams ?? []}
                        />
                    )}
                </div>
            </div>
        </main>
    )
}

export default favorites
