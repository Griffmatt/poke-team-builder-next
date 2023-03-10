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
                withStats ? "grid gap-2 sm:grid-cols-2" : "pokemon-team-row"
            }`}
        >
            {team?.pokemon.map((pokemon) => {
                const favorited = favoritePokemon?.includes(pokemon.id) ?? false
                return (
                    <React.Fragment key={pokemon.id}>
                        {withStats ? (
                            <div className={`${favorite ? "favorite" : ""}`}>
                                <PokemonCardWithStats
                                    createdPokemon={pokemon}
                                    favorite={favorited}
                                />
                            </div>
                        ) : (
                            <div className="w-full p-2 md:p-3">
                                <PokemonImage
                                    pokemonName={pokemon.name}
                                    createdPokemon={pokemon}
                                />
                            </div>
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    )
}
