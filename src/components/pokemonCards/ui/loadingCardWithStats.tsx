import { STATS } from "assets/stats"
import { SkeletonRoundImage } from "./skeletonPokemonImage"

export const LoadingCardWithStats = () => {
    const movesFillerArr = Array.from({ length: 4 }, () => 0)
    return (
        <div className="relative w-full animate-pulse bg-dark-2 text-center">
            <h2 className="h-[2.375rem] animate-pulse border dark:border-dark-3"></h2>
            <div className="flex">
                <div className="flex items-center justify-center border border-dark-3 p-2">
                    <div className="aspect-square h-12">
                        <SkeletonRoundImage />
                    </div>
                </div>
                <div className="grid w-full md:grid-cols-2">
                    <div className="grid">
                        <div className="flex items-center gap-2 border border-dark-3 p-1">
                            <h3>Tera type:</h3>
                        </div>
                        <div className="flex items-center gap-2 border border-dark-3 p-1">
                            <h3>Ability:</h3>
                        </div>
                        <div className="flex items-center gap-2 border border-dark-3 p-1">
                            <h3>Nature:</h3>
                        </div>
                        <div className="flex items-center gap-2 border border-dark-3 p-1">
                            <h3>Held item:</h3>
                        </div>
                    </div>
                    <div className="hidden flex-col items-center md:flex">
                        <h3 className="w-full border border-dark-3 p-1">
                            Moves
                        </h3>
                        <div className="flex h-full w-full flex-col justify-between border p-1 dark:border-dark-3">
                            {movesFillerArr.map((_, index) => {
                                return (
                                    <div key={index} className="w-full">
                                        <p className="h-[1rem] p-1 xs:h-[1.25rem]" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid md:hidden">
                <h3 className="border p-1 dark:border-dark-3">Moves</h3>
                <div className="grid grid-cols-2 border dark:border-dark-3">
                    {movesFillerArr.map((_, index) => {
                        return (
                            <div key={index} className="w-full p-1">
                                <p className="h-[1rem] p-1 xs:h-[1.25rem]" />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="grid md:grid-cols-2">
                <div className="border border-dark-3">
                    <h3>EVs</h3>
                    <div className="grid grid-cols-6">
                        {STATS.map((stat) => {
                            return (
                                <div key={`${stat}EV`}>
                                    <h4>{stat}</h4>
                                    <p className="h-[1rem] p-1 xs:h-[1.25rem]" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="border border-dark-3">
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
