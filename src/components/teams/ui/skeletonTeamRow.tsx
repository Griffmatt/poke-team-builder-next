import { SkeletonRoundImage } from "components/pokemonCards/ui/skeletonPokemonImage"

export const SkeletonTeamRow = ({ amount = 6 }) => {
    const fillerArr = Array.from({ length: amount }, () => 0)
    return (
        <div className="grid gap-3">
            <h3 className="h-6 w-32 animate-pulse bg-dark-3" />
            <div className="pokemon-team-row">
                {fillerArr.map((_, index) => (
                    <div className="w-full p-2 md:p-3" key={index}>
                        <SkeletonRoundImage />
                    </div>
                ))}
            </div>
        </div>
    )
}
