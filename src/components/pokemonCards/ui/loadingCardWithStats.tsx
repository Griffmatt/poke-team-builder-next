import { STATS } from "assets/stats"
import { SkeletonRoundImage } from "./skeletonPokemonImage"

export const LoadingCardWithStats = () => {
    const movesFillerArr = Array.from({ length: 4 }, () => 0)
    return (
        <div className="relative w-full animate-pulse bg-dark-2 text-center">
            <div className="flex justify-between border border-dark-3">
                <div className="aspect-square h-12 p-2">
                    <SkeletonRoundImage />
                </div>
                <h2 className="h-[2.375rem]" />
                <div className="flex h-8 w-8 items-center p-2" />
            </div>
            <div className="grid w-full md:grid-cols-2">
                <div className="grid">
                    <h3 className="border border-dark-3 p-1 text-left">Tera</h3>
                    <h3 className="border border-dark-3 p-1 text-left">
                        Ability
                    </h3>
                    <h3 className="border border-dark-3 p-1 text-left">
                        Nature
                    </h3>
                    <h3 className="border border-dark-3 p-1 text-left">Item</h3>
                </div>
                <div className="flex flex-col">
                    <h3 className="border border-dark-3 p-1">Moves</h3>
                    <div className="grid h-full grid-cols-2 border border-dark-3 md:grid-cols-1">
                        {movesFillerArr.map((_, index) => {
                            return <div key={index} />
                        })}
                    </div>
                </div>
            </div>
            <div className="grid border border-dark-3 md:grid-cols-2">
                <div className="grid grid-cols-6 md:hidden">
                    {STATS.sort().map((stat) => (
                        <h4 key={stat}>{stat}</h4>
                    ))}
                </div>
                <div className="p-1">
                    <h3>EVs</h3>
                    <div className="grid grid-cols-6">
                        {STATS.map((stat) => {
                            return (
                                <div key={`${stat}EV`}>
                                    <h4 className="hidden md:block">{stat}</h4>
                                    <p className="h-[1rem] p-1 xs:h-[1.25rem]" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="p-1">
                    <h3>IVs</h3>
                    <div className="grid grid-cols-6">
                        {STATS.map((stat) => {
                            return (
                                <div key={`${stat}IV`}>
                                    <h4 className="hidden md:block">{stat}</h4>
                                    <p className="h-[1rem] p-1 xs:h-[1.25rem]" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
