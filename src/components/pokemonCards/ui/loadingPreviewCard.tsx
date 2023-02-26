import { STATS } from "assets/stats"
import { SkeletonRoundImage } from "./skeletonPokemonImage"

export const LoadingPreviewCard = () => {
    const fillerMovesArr = Array.from({ length: 4 }, () => 0)
    return (
        <div className="w-full bg-dark-2 text-center lg:w-fit lg:min-w-[60%]">
            <div className="flex">
                <div className="flex items-center justify-center border border-dark-3 p-2">
                    <div className="aspect-square h-12">
                        <SkeletonRoundImage />
                    </div>
                </div>
                <div className="grid w-full grid-cols-2">
                    <div className="grid border border-dark-3">
                        <div className="p-1">
                            <p className="h-4 xs:h-5" />
                        </div>
                        <div className="border-t border-dark-3 p-1">
                            <p className="h-4 xs:h-5" />
                        </div>
                        <div className="border-t border-dark-3 p-1">
                            <p className="h-4 xs:h-5" />
                        </div>
                        <div className="border-t border-dark-3 p-1">
                            <p className="h-4 xs:h-5" />
                        </div>
                    </div>
                    <div className="grid border border-dark-3">
                        {fillerMovesArr.map((_, index) => {
                            return (
                                <div key={index} className="p-1">
                                    <p className="h-4 xs:h-5" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="grid border border-dark-3 md:grid-cols-2">
                <div className="p-1">
                    <div className="grid grid-cols-6">
                        {STATS.map((ev) => {
                            return (
                                <div key={`${ev}EV`}>
                                    <h4>{ev}</h4>
                                    <p className="h-4 xs:h-5" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="p-1">
                    <div className="grid grid-cols-6">
                        {STATS.map((iv) => {
                            return (
                                <div key={`${iv}IV`}>
                                    <h4>{iv}</h4>
                                    <p className="h-4 xs:h-5" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
