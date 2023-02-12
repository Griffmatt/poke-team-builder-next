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
            <div className="h-8 w-40 animate-pulse bg-dark-2" />
            <div className="grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-3">
                <div className="h-fit w-full lg:row-span-2">
                    <div className="flex h-full flex-col justify-around p-3">
                        <div className="aspect-square animate-pulse rounded-full bg-dark-3" />
                    </div>
                </div>
                <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
                    <div>
                        <h2>Pokemon Info</h2>
                        <label className="grid">
                            Ability
                            <div className="h-8 w-full animate-pulse bg-dark-2" />
                        </label>
                        <label className="grid">
                            Nature
                            <div className="h-8 w-full animate-pulse bg-dark-2" />
                        </label>
                        <label className="grid">
                            Held Item
                            <div className="h-8 w-full animate-pulse bg-dark-2" />
                        </label>
                        <label className="grid">
                            Tera Type
                            <div className="h-8 w-full animate-pulse bg-dark-2" />
                        </label>
                    </div>
                    <div>
                        <h2>Moves</h2>
                        {fillerArr4.map((_, index) => {
                            const moveOrder = formatOrder(index)
                            return (
                                <label>
                                    {moveOrder} Move
                                    <div
                                        key={index}
                                        className="h-8 w-full animate-pulse bg-dark-2"
                                    />
                                </label>
                            )
                        })}
                    </div>
                </div>
                <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
                    <div>
                        <h2>Evs</h2>
                        {stats.map((stat, index) => {
                            return (
                                <label key={index * 10}>
                                    {stat}
                                    <div className="flex w-full gap-2">
                                        <button
                                            className="w-8 rounded-xl"
                                            type="button"
                                        >
                                            -
                                        </button>
                                        <div
                                            key={index}
                                            className="h-8 w-full animate-pulse bg-dark-2"
                                        />
                                        <button
                                            className="w-8 rounded-xl"
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
                        {stats.map((stat, index) => {
                            return (
                                <label key={index * 100}>
                                    {stat}
                                    <div className="flex w-full gap-2">
                                        <button
                                            className="w-8 rounded-xl"
                                            type="button"
                                        >
                                            -
                                        </button>
                                        <div className="h-8 w-full animate-pulse bg-dark-2" />
                                        <button
                                            className="w-8 rounded-xl"
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
                    className="w-full rounded-xl p-4 md:col-start-2 lg:col-start-3"
                    disabled
                >
                    {build ? "Update Pokemon" : "Create Pokemon"}
                </button>
            </div>
        </main>
    )
}