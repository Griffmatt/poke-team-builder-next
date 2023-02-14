import { PokemonCard } from "components/pokemonCards/pokemonCard"
import { PokemonCardWithStats } from "components/pokemonCards/pokemonCardWithStats"
import { useSession } from "next-auth/react"
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
                withStats ? "grid gap-2 md:grid-cols-3" : "pokemon-card-grid"
            }`}
        >
            {team?.pokemon.map((pokemon) => {
                const favorited = favoritePokemon?.includes(pokemon.id) ?? false
                return (
                    <div
                        className={`pokemon-card ${favorite ? "favorite" : ""}`}
                        key={pokemon.id}
                    >
                        {withStats ? (
                            <PokemonCardWithStats
                                createdPokemon={pokemon}
                                favorite={favorited}
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
