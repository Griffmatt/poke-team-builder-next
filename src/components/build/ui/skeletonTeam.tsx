import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"
import { BuildNav } from "../buildNav"

export const SkeletonTeamBuildPage = () => {
    return (
        <main>
            <h1>Building Team</h1>
            <BuildNav selected="team" />
            <div className="grid gap-3">
                <div className="flex flex-col gap-2 md:flex-row">
                    <input className="md:w-72" value={"Team Name"} readOnly />
                    <div className="flex gap-2">
                        <button className="btn-transparent text-xl font-extrabold text-primary">
                            Double
                        </button>
                        <button className="btn-transparent text-xl font-extrabold text-gray">
                            Single
                        </button>
                    </div>
                </div>
                <div className="pokemon-team-row">
                    <div className="aspect-square w-full" />
                </div>
                <button className="rounded-2xl p-3">Build Team</button>
            </div>
            <div>
                <div className="sticky top-[3.375rem] z-30 grid gap-2 bg-dark/95 p-2 md:grid-cols-2">
                    <div className="grid h-10 w-full grid-cols-6 rounded bg-dark-2 p-1 md:w-60" />
                    <input
                        placeholder="Search for a pokemon..."
                        type="text"
                        className="ml-auto w-full rounded-2xl px-4 py-2 text-black md:w-60"
                        readOnly
                    />
                </div>
                <SkeletonPokemonGrid />
            </div>
        </main>
    )
}
