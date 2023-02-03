import { PokemonCardWithStats } from "components/pokemonCardWithStats"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"
import { api } from "utils/api"

const PokemonBuilds = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const { pokemonName } = router.query
    const { data: pokemonData } = api.pokemon.getPokemonBuilds.useQuery({
        pokemonName: pokemonName as string,
    })
    const { data: favorites } = api.favorite.checkUserFavoritePokemon.useQuery({
        userId: session?.user?.id as string,
    })

    return (
        <main>
            {pokemonName && <h1>{pokemonName} Builds</h1>}
            <div className="grid gap-3">
                <div className="grid place-items-center gap-2 md:grid-cols-3">
                    {pokemonData?.map((pokemon) => {
                        const favorite =
                            favorites?.includes(pokemon.id) ?? false
                        return (
                            <div className="pokemon-card">
                                <PokemonCardWithStats
                                    createdPokemon={pokemon}
                                    favorite={favorite}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default PokemonBuilds
