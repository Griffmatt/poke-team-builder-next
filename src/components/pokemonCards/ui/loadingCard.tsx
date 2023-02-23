import { SkeletonRoundImage } from "./skeletonPokemonImage"

export const LoadingCard = () => {
    return (
        <div className="grid gap-1 md:gap-3 lg:gap-5">
            <SkeletonRoundImage />
            <div className="grid place-items-end">
                <div className="mb-1 h-4 w-24 animate-pulse bg-dark-3 md:h-5" />
                <div className="h-4 w-10 animate-pulse bg-dark-3 md:h-5" />
            </div>
        </div>
    )
}
