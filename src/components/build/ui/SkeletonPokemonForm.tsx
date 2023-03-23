import { STATS } from "assets/stats"
import { LoadingInfoCard } from "components/pokemonCards/ui/loadingInfoCard"
import { formatOrder } from "utils/formatOrder"
import { formatString } from "utils/formatString"

interface Props {
    build: boolean
    pokemonName: string
}

export const SkeletonPokemonForm = ({ build, pokemonName }: Props) => {
    const fillerArr = Array.from({ length: 4 }, () => 0)
    return (
        <main aria-label="Loading">
            <h1 className="truncate">Building {formatString(pokemonName)}</h1>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-full grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <LoadingInfoCard />
                    <div>
                        <h2>Pokemon Info</h2>
                        <div>
                            <h3>Ability</h3>
                            <div className="h-8 w-full animate-pulse bg-dark-2" />
                        </div>
                        <div>
                            <h3>Nature</h3>
                            <div className="h-8 w-full animate-pulse bg-dark-2" />
                        </div>
                        <div>
                            <h3>Held item</h3>
                            <div className="h-8 w-full animate-pulse bg-dark-2" />
                        </div>
                        <div>
                            <h3>Tera type</h3>
                            <div className="h-8 w-full animate-pulse bg-dark-2" />
                        </div>
                    </div>
                    <div className="col-span-full lg:col-span-1">
                        <h2>Moves</h2>
                        <div className="col-span-full grid md:grid-cols-2 md:gap-2 lg:grid-cols-1 lg:gap-0">
                            {fillerArr.map((_, index) => {
                                const moveOrder = formatOrder(index)
                                return (
                                    <div key={index}>
                                        <h3>{moveOrder} move</h3>
                                        <div
                                            key={index}
                                            className="h-8 w-full animate-pulse bg-dark-2"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2 lg:col-start-2">
                    <div>
                        <h2>Evs</h2>
                        {STATS.map((stat, index) => {
                            return (
                                <label key={index * 100}>
                                    {stat}
                                    <div className="flex w-full gap-2">
                                        <button
                                            className="aspect-square h-7 rounded-xl bg-dark-3 text-xl font-bold text-primary"
                                            type="button"
                                        >
                                            -
                                        </button>
                                        <div className="h-7 w-full animate-pulse bg-dark-2" />
                                        <button
                                            className="aspect-square h-7 rounded-xl bg-dark-3 text-xl font-bold text-primary"
                                            type="button"
                                        >
                                            +
                                        </button>
                                    </div>
                                </label>
                            )
                        })}
                    </div>
                    <div>
                        <h2>Ivs</h2>
                        {STATS.map((stat, index) => {
                            return (
                                <label key={index * 1000}>
                                    {stat}
                                    <div className="flex w-full gap-2">
                                        <button
                                            className="aspect-square h-7 rounded-xl bg-dark-3 text-xl font-bold text-primary"
                                            type="button"
                                        >
                                            -
                                        </button>
                                        <div className="h-7 w-full animate-pulse bg-dark-2" />
                                        <button
                                            className="aspect-square h-7 rounded-xl bg-dark-3 text-xl font-bold text-primary"
                                            type="button"
                                        >
                                            +
                                        </button>
                                    </div>
                                </label>
                            )
                        })}
                    </div>
                </div>
                <button
                    className="h-fit w-full rounded-xl py-2 sm:col-start-2 lg:col-start-3"
                    disabled
                >
                    {build ? "Build Pokemon" : "Update Pokemon"}
                </button>
            </div>
        </main>
    )
}
