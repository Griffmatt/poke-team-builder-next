export const LoadingCardWithStats = () => {
    const movesFillerArr = Array.from({ length: 4 }, () => 0)
    const stats = ["HP", "Att", "Def", "SpA", "SpD", "Spe"]
    return (
        <div className="flex aspect-[7/10] flex-col justify-between p-4 text-center">
            <h2 className="mx-auto mb-1 h-6 w-40 animate-pulse bg-dark-3" />
            <div className="h-fit justify-between lg:flex">
                <div className="relative my-auto aspect-square w-full">
                    <div className="aspect-square w-full animate-pulse rounded-full bg-dark-3" />
                </div>
                <div className="h-fit lg:w-[50%]">
                    <div>
                        <h2>Type</h2>
                        <p className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5" />
                    </div>
                    <div>
                        <h2>Tera Type</h2>
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
                        <h2>Held Item</h2>
                        <p className="mx-auto h-4 w-20 animate-pulse bg-dark-3 xs:h-5" />
                    </div>
                    <div className="mx-auto w-fit">
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
                        {stats.map((stat) => {
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
                        {stats.map((stat) => {
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
