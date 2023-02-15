import { PokemonCardWithStats } from "components/pokemonCards/pokemonCardWithStats"
import { PokemonImage } from "components/pokemonCards/pokemonImage"
import { useSession } from "next-auth/react"
import React from "react"
import { type team } from "types/trpc"
import { api } from "utils/api"

interface Props {
    team: team
    withStats: boolean
    favorite: boolean
}

export const TeamRow = ({ team, withStats, favorite }: Props) => {
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
                withStats
                    ? "grid gap-2 md:grid-cols-3"
                    : "pokemon-team-row rounded-2xl p-2 dark:bg-dark-2 "
            }`}
        >
            {team?.pokemon.map((pokemon) => {
                const favorited = favoritePokemon?.includes(pokemon.id) ?? false
                return (
                    <>
                        {withStats ? (
                            <div
                                className={`pokemon-card ${
                                    favorite ? "favorite" : ""
                                }`}
                                key={pokemon.id}
                            >
                                <PokemonCardWithStats
                                    createdPokemon={pokemon}
                                    favorite={favorited}
                                />
                            </div>
                        ) : (
                            <React.Fragment key={pokemon.id}>
                                <PokemonImage
                                    pokemonName={pokemon.name}
                                    createdPokemon={pokemon}
                                />
                            </React.Fragment>
                        )}
                    </>
                )
            })}
        </div>
    )
}
