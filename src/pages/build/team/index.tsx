import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import React, { useLayoutEffect, useState } from "react"
import { BuildNav } from "components/build/buildNav"
import { PokemonEmpty } from "components/pokemonGrids/ui/pokemonEmpty"
import { useBuildTeam } from "hooks/useBuildTeam"
import { api } from "utils/api"
import { useDebounceQuery } from "hooks/useDebounceQuery"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { PokemonImage } from "components/pokemonCards/pokemonImage"
import { useScreenSize } from "hooks/useScreenSize"
import { SkeletonTeamBuildPage } from "components/build/ui/skeletonTeam"
import { BuildTeamGridRow } from "components/build/team/buildTeamGridRow"

const BuildTeam: NextPage = () => {
    const { data: session } = useSession()
    const [animationParent] = useAutoAnimate()
    const { width } = useScreenSize()

    const [query, setQuery] = useState("")
    const debouncedValue = useDebounceQuery(query)

    const [gridLength, setGridLength] = useState(6)
    const [selectedRow, setSelectedRow] = useState<number | null>(null)

    useLayoutEffect(() => {
        if (width >= 1024) {
            setGridLength(6)
        }
        if (width < 1024 && width > 640) {
            setGridLength(4)
        }
        if (width <= 640 && width >= 425) {
            setGridLength(3)
        }
        if (width < 425) {
            setGridLength(2)
        }
    }, [width])

    const {
        data: pokemons,
        isLoading,
        error,
    } = api.pokemon.getUsersPokemon.useQuery(
        {
            userId: session?.user?.id as string,
        },
        {
            enabled: !!session?.user?.id,
        }
    )

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

    if (isLoading) return <SkeletonTeamBuildPage />
    if (error) return <div>Error: {error.message}</div>

    const filteredPokemon = pokemons.filter(
        (pokemon) =>
            !pokemonOnTeam.some(
                (pokemonFilter) => pokemon.id === pokemonFilter?.id
            ) && pokemon.name.includes(debouncedValue)
    )

    const pokemonRows = []
    let i = 0
    while (pokemonRows.length !== filteredPokemon.length) {
        pokemonRows.push(filteredPokemon.slice(i, i + gridLength))
        i += gridLength
    }
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
                    className="rounded-2xl p-3"
                    onClick={() => void buildTeam()}
                >
                    Build Team
                </button>
            </div>
            <div>
                <div className="pointer-events-none sticky top-[3.375rem] z-50 flex justify-between bg-dark/95 py-2 lg:top-0 lg:bg-transparent">
                    <div className="hidden h-10 grid-cols-6 rounded bg-dark-2 p-1 md:grid md:w-60">
                        {pokemonOnTeam.map((pokemon) => {
                            return (
                                <div
                                    key={pokemon.id}
                                    className="aspect-square h-8"
                                >
                                    <PokemonImage
                                        pokemonName={pokemon.name}
                                        createdPokemon={pokemon}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <input
                        placeholder="Search for a pokemon..."
                        type="text"
                        onChange={(event) => setQuery(event.target.value)}
                        className="pointer-events-auto w-full rounded-2xl px-4 py-2 text-black md:w-60"
                    />
                </div>
                {filteredPokemon.length === 0 ? (
                    <PokemonEmpty
                        query={query}
                        hasPokemon={pokemons.length > 0}
                    />
                ) : (
                    <div>
                        {pokemonRows.map((pokemonRow, index) => {
                            return (
                                <div
                                    className="pokemon-grid-card-layout"
                                    key={index}
                                >
                                    <BuildTeamGridRow
                                        pokemonRow={pokemonRow}
                                        addPokemonToTeam={addPokemonToTeam}
                                        selectedRow={selectedRow}
                                        setSelectedRow={setSelectedRow}
                                        index={index}
                                    />
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </main>
    )
}

export default BuildTeam
