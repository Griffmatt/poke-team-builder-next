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
                            <h4>Tera</h4>
                            <p className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5" />
                        </div>
                        <div>
                            <h4>Ability</h4>
                            <p className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5" />
                        </div>
                        <div>
                            <h4>Nature</h4>
                            <p className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5" />
                        </div>
                        <div>
                            <h4>Item</h4>
                            <p className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5" />
                        </div>
                    </div>
                    <div>
                        <h4>Moves</h4>
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
                    <h4>EVs</h4>
                    <div className="grid grid-cols-3">
                        {STATS.map((stat) => {
                            return (
                                <div key={`${stat}EV`}>
                                    <h5>{stat}</h5>
                                    <p className=" mx-auto h-4 w-8 animate-pulse bg-dark-3 xs:h-5" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h4>IVs</h4>
                    <div className="grid grid-cols-3">
                        {STATS.map((stat) => {
                            return (
                                <div key={`${stat}IV`}>
                                    <h5>{stat}</h5>
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
