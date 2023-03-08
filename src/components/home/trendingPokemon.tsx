import { PokemonDataGrid } from "components/pokemonGrids/pokemonDataGrid"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"
import { api } from "utils/api"

export const TrendingPokemon = () => {
    const {
        data: pokemonData,
        isLoading,
        error,
    } = api.statistics.getTopPokemon.useQuery()

    if (isLoading) {
        return (
            <section className="grid gap-3">
                <h2>Pokemon</h2>
                <SkeletonPokemonGrid amount={12} dataGrid={true} />
            </section>
        )
    }

    if (error) return <div>Error: {error.message}</div>
    return (
        <section className="grid gap-3">
            <h2>Pokemon</h2>
            <PokemonDataGrid pokemonData={pokemonData} amount={12} />
        </section>
    )
}
