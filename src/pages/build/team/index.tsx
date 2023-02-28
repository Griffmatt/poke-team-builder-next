import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { BuildNav } from "components/build/buildNav"
import { useBuildTeam } from "hooks/useBuildTeam"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { PokemonImage } from "components/pokemonCards/pokemonImage"
import { BuildTeamGrid } from "components/build/team/buildTeamGrid"

const BuildTeam: NextPage = () => {
    const { data: session } = useSession()
    const [animationParent] = useAutoAnimate()

    const {
        addPokemonToTeam,
        removePokemonFromTeam,
        teamName,
        handleNameChange,
        buildTeam,
        teamStyle,
        setTeamStyle,
        pokemonOnTeam,
    } = useBuildTeam(session?.user?.id as string)

    return (
        <main>
            <h1>Building Team</h1>
            <BuildNav selected="team" />
            <div className="grid gap-3">
                <div className="flex flex-col gap-2 md:flex-row">
                    <input
                        className="md:w-72"
                        value={teamName}
                        onChange={(event) =>
                            handleNameChange(event.target.value)
                        }
                    />
                    <div className="flex gap-2">
                        <button
                            className={`${
                                teamStyle === "Double"
                                    ? "text-primary"
                                    : "text-gray"
                            } btn-transparent text-xl font-extrabold`}
                            onClick={() => setTeamStyle("Double")}
                        >
                            Double
                        </button>
                        <button
                            className={`${
                                teamStyle === "Single"
                                    ? "text-primary"
                                    : "text-gray"
                            } btn-transparent text-xl font-extrabold`}
                            onClick={() => setTeamStyle("Single")}
                        >
                            Single
                        </button>
                    </div>
                </div>
                <div className="pokemon-team-row" ref={animationParent}>
                    {pokemonOnTeam.length === 0 ? (
                        //placeholder for when there are no cards to keep page structure
                        <div className="aspect-square w-full" />
                    ) : (
                        pokemonOnTeam.map((pokemon) => {
                            return (
                                <button
                                    key={pokemon?.id}
                                    className="btn-transparent w-full rounded-full p-2"
                                    onClick={() =>
                                        removePokemonFromTeam(pokemon.id)
                                    }
                                >
                                    <PokemonImage
                                        pokemonName={pokemon.name}
                                        createdPokemon={pokemon}
                                    />
                                </button>
                            )
                        })
                    )}
                </div>

                <button
                    className="rounded-2xl p-2"
                    onClick={() => void buildTeam()}
                >
                    Build Team
                </button>
            </div>
            <BuildTeamGrid
                pokemonOnTeam={pokemonOnTeam}
                addPokemonToTeam={addPokemonToTeam}
            />
        </main>
    )
}

export default BuildTeam
