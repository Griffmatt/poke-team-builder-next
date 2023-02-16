import { BackButton } from "components/ui/backButton"
import { formatOrder } from "utils/formatOrder"

interface Props {
    build: boolean
}

export const SkeletonPokemonForm = ({ build }: Props) => {
    const fillerArr4 = Array.from({ length: 4 }, () => 0)
    const stats = ["HP", "Att", "Def", "SpA", "SpD", "Spe"]
    return (
        <main>
            <BackButton />
            <div className="h-8 w-48 animate-pulse bg-dark-2" />
            <div className="grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="h-fit w-full lg:row-span-2">
                    <div className="aspect-square w-full animate-pulse rounded-full border-8 border-dark-2 bg-dark-3 " />
                </div>
                <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
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
                    <div>
                        <h2>Moves</h2>
                        {fillerArr4.map((_, index) => {
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
                <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2">
                    <div>
                        <h2>Evs</h2>
                        {stats.map((stat, index) => {
                            return (
                                <div key={index * 100}>
                                    {stat}
                                    <div className="flex w-full gap-2">
                                        <button
                                            className="w-8 rounded-xl text-xl font-bold text-primary dark:bg-dark-3"
                                            type="button"
                                        >
                                            -
                                        </button>
                                        <div
                                            key={index}
                                            className="h-8 w-full animate-pulse bg-dark-2"
                                        />
                                        <button
                                            className="w-8 rounded-xl text-xl font-bold text-primary dark:bg-dark-3"
                                            type="button"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <h2>Ivs</h2>
                        {stats.map((stat, index) => {
                            return (
                                <div key={index * 1000}>
                                    {stat}
                                    <div className="flex w-full gap-2">
                                        <button
                                            className="w-8 rounded-xl text-xl font-bold text-primary dark:bg-dark-3"
                                            type="button"
                                        >
                                            -
                                        </button>
                                        <div className="h-8 w-full animate-pulse bg-dark-2" />
                                        <button
                                            className="w-8 rounded-xl text-xl font-bold text-primary dark:bg-dark-3"
                                            type="button"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button
                    className="w-full rounded-xl p-4 sm:col-start-2 lg:col-start-3"
                    disabled
                >
                    {build ? "Build Pokemon" : "Update Pokemon"}
                </button>
            </div>
        </main>
    )
}
