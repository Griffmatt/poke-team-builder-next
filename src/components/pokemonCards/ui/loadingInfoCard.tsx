import { SkeletonRoundImage } from "./skeletonPokemonImage"

export const LoadingInfoCard = () => {
    return (
        <section className="h-full rounded text-center">
            <div className="flex items-center justify-center p-2">
                <div className="aspect-square w-[50%]">
                    <SkeletonRoundImage />
                </div>
            </div>
            <div className="col-span-full mx-auto grid grid-cols-2 place-items-center gap-2">
                <div className="w-fit">
                    <h3>Strengths</h3>
                    <div className="h-5 lg:h-7" />
                </div>
                <div>
                    <h3>Weaknesses</h3>
                    <div className="h-5 lg:h-7" />
                </div>
            </div>
        </section>
    )
}
