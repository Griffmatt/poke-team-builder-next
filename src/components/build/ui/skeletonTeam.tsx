import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"
import { BuildNav } from "../buildNav"

export const SkeletonTeamBuildPage = () => {
    return (
        <main>
            <div className="flex flex-col justify-between gap-2 md:flex-row">
                <h1>Building Team</h1>
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    className="-60 rounded-2xl px-4 py-2 text-black"
                    readOnly
                />
            </div>
            <BuildNav selected="team" />
            <div className="grid gap-3">
                <div className="flex flex-col gap-2 md:flex-row">
                    <input className="md:w-72" value={"Team Name"} readOnly />
                    <div className="flex gap-2">
                        <button className="btn-transparent text-xl font-extrabold text-primary">
                            Double
                        </button>
                        <button className="btn-transparent text-xl text-gray">
                            Single
                        </button>
                    </div>
                </div>
                <div className="pokemon-team-row">
                    <div className="aspect-square w-full" />
                </div>
                <button className="rounded-2xl p-3">Build Team</button>
            </div>
            <SkeletonPokemonGrid />
        </main>
    )
}
