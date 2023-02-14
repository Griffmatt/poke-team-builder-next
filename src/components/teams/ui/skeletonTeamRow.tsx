import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"

export const SkeletonTeamRow = () => {
    return (
        <div className="grid gap-3">
            <div className="h-6 w-32 animate-pulse bg-dark-2" />
            <SkeletonPokemonGrid amount={6} />
        </div>
    )
}
