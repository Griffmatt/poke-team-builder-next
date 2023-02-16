import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { BuildNav } from "components/build/buildNav"
import { PokemonCard } from "components/pokemonCards/pokemonCard"
import { PokemonEmpty } from "components/pokemonGrids/ui/pokemonEmpty"
import { useBuildTeam } from "hooks/useBuildTeam"
import { api } from "utils/api"
import { useDebounceQuery } from "hooks/useDebounceQuery"

import { useAutoAnimate } from "@formkit/auto-animate/react"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"
import { PokemonImage } from "components/pokemonCards/pokemonImage"

const BuildTeam: NextPage = () => {
    const { data: session } = useSession()
    const [animationParent] = useAutoAnimate()

    const [query, setQuery] = useState("")
    const debouncedValue = useDebounceQuery(query)

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

    if (isLoading) return <BuildTeamSkeleton />
    if (error) return <div>Error: {error.message}</div>

    const filteredPokemon = pokemons.filter(
        (pokemon) =>
            !pokemonOnTeam.some(
                (pokemonFilter) => pokemon.id === pokemonFilter?.id
            ) && pokemon.name.includes(debouncedValue)
    )

    return (
        <main>
            <div className="flex flex-col justify-between gap-2 md:flex-row">
                <h1>Building Team</h1>
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    onChange={(event) => setQuery(event.target.value)}
                    className="max-w-60 rounded-2xl px-4 py-2 text-black"
                />
            </div>
            <BuildNav selected="team" />
            <div className="grid gap-3">
                <div className="flex flex-col gap-2 md:flex-row">
                    <input
                        className="max-w-72"
                        value={teamName}
                        onChange={(event) =>
                            handleNameChange(event.target.value)
                        }
                    />
                    <div className="flex gap-2">
                        <button
                            className={`${
                                teamStyle === "Double"
                                    ? "font-extrabold text-primary"
                                    : "text-gray"
                            } btn-transparent text-xl`}
                            onClick={() => setTeamStyle("Double")}
                        >
                            Double
                        </button>
                        <button
                            className={`${
                                teamStyle === "Single"
                                    ? "font-extrabold text-primary"
                                    : "text-gray"
                            } btn-transparent text-xl`}
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
                                    className="w-full rounded-full"
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
            {filteredPokemon.length === 0 && (
                <PokemonEmpty query={query} hasPokemon={pokemons.length > 0} />
            )}
            <div className="pokemon-card-grid" ref={animationParent}>
                {filteredPokemon?.map((pokemon) => {
                    const favorited =
                        pokemon.favorited[0]?.userId === pokemon.userId
                    return (
                        <button
                            className={`pokemon-card ${
                                favorited ? "favorite" : ""
                            }`}
                            onClick={() => addPokemonToTeam(pokemon)}
                            key={pokemon.id}
                        >
                            <PokemonCard
                                pokemonName={pokemon.name}
                                createdPokemon={pokemon}
                            />
                        </button>
                    )
                })}
            </div>
        </main>
    )
}

export default BuildTeam

const BuildTeamSkeleton = () => {
    return (
        <main>
            <div className="flex flex-col justify-between gap-2 md:flex-row">
                <h1>Building Team</h1>
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    className="max-w-60 rounded-2xl px-4 py-2 text-black"
                    readOnly
                />
            </div>
            <BuildNav selected="team" />
            <div className="grid gap-3">
                <div className="flex flex-col gap-2 md:flex-row">
                    <input className="max-w-72" value={"Team Name"} readOnly />
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
