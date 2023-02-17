import { PokemonCardWithStats } from "components/pokemonCards/pokemonCardWithStats"
import { LoadingCard } from "components/pokemonCards/ui/loadingCard"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"
import { api } from "utils/api"

const PokemonBuilds = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const { pokemonName } = router.query
    const {
        data: pokemonData,
        isLoading,
        error,
    } = api.pokemon.getPokemonBuilds.useQuery({
        pokemonName: pokemonName as string,
    })
    const {
        data: favorites,
        isLoading: isLoading2,
        error: error2,
        isFetching,
    } = api.favorite.checkUserFavoritePokemon.useQuery(
        {
            userId: session?.user?.id as string,
        },
        { enabled: !!session?.user?.id }
    )

    if (isLoading || (isLoading2 && isFetching)) {
        const fillerArr = Array.from({ length: 6 }, () => 0)
        return (
            <main>
                {pokemonName && <h1>{pokemonName} Builds</h1>}
                <div className="grid gap-3">
                    <div className="grid place-items-center gap-2 md:grid-cols-3">
                        {fillerArr.map((_, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <LoadingCard />
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>

    return (
        <main>
            {pokemonName && <h1>{pokemonName} Builds</h1>}
            <div className="grid gap-3">
                <div className="grid place-items-center gap-2 md:grid-cols-3">
                    {pokemonData.map((pokemon) => {
                        const favorite =
                            favorites?.includes(pokemon.id) ?? false
                        return (
                            <div className="pokemon-card" key={pokemon.id}>
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
