import { STATS } from "assets/stats"
import { SkeletonRoundImage } from "./skeletonPokemonImage"

export const LoadingCardWithStats = () => {
    const movesFillerArr = Array.from({ length: 4 }, () => 0)
    return (
        <div className="grid gap-1 text-center">
            <h2 className="mx-auto mb-1 h-6 w-40 animate-pulse bg-dark-3" />
            <div className="justify-between lg:flex">
                <div className="my-auto w-full">
                    <SkeletonRoundImage />
                </div>
                <div className="lg:w-[50%]">
                    <div className="grid grid-cols-2 lg:grid-cols-1">
                        <div>
                            <h2>Tera</h2>
                            <p className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5" />
                        </div>
                        <div>
                            <h2>Ability</h2>
                            <p className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5" />
                        </div>
                        <div>
                            <h2>Nature</h2>
                            <p className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5" />
                        </div>
                        <div>
                            <h2>Item</h2>
                            <p className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5" />
                        </div>
                    </div>
                    <div>
                        <h2>Moves</h2>
                        <div className="grid grid-cols-2 gap-1 lg:grid-cols-1">
                            {movesFillerArr.map((_, index) => {
                                return (
                                    <p
                                        className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5"
                                        key={index}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <h2>EVs</h2>
                    <div className="grid grid-cols-3">
                        {STATS.map((stat) => {
                            return (
                                <div key={`${stat}EV`}>
                                    <h3>{stat}</h3>
                                    <p className=" mx-auto h-4 w-8 animate-pulse bg-dark-3 xs:h-5" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2>IVs</h2>
                    <div className="grid grid-cols-3">
                        {STATS.map((stat) => {
                            return (
                                <div key={`${stat}IV`}>
                                    <h3>{stat}</h3>
                                    <p className="mx-auto h-4 w-8 animate-pulse bg-dark-3 xs:h-5" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
