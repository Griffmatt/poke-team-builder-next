import { SkeletonRoundImage } from "./skeletonPokemonImage"

export const LoadingCard = () => {
    return (
        <div className="grid gap-1">
            <SkeletonRoundImage />
            <div className="grid place-items-end">
                <div className="mb-1 h-4 w-[75%] animate-pulse bg-dark-3 md:h-5" />
                <div className="h-4 w-[50%] animate-pulse bg-dark-3 md:h-5" />
            </div>
        </div>
    )
}
