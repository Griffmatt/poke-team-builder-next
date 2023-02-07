import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { BuildNav } from "components/build/buildNav"
import { PokemonCard } from "components/pokemonGrids/cards/pokemonCard"
import { PokemonEmpty } from "components/pokemonGrids/ui/pokemonEmpty"
import { useBuildTeam } from "hooks/useBuildTeam"
import { api } from "utils/api"
import { useDebounceQuery } from "hooks/useDebounceQuery"

import { useAutoAnimate } from "@formkit/auto-animate/react"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"

const BuildTeam: NextPage = () => {
    const { data: session } = useSession()
    const { data: pokemons } = api.pokemon.getUsersPokemon.useQuery({
        userId: session?.user?.id as string,
    })
    const [query, setQuery] = useState("")

    const debouncedValue = useDebounceQuery(query)

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

    const filteredPokemon = pokemons?.filter(
        (pokemon) =>
            !pokemonOnTeam.some(
                (pokemonFilter) => pokemon.id === pokemonFilter?.id
            ) && pokemon.name.includes(debouncedValue)
    )

    const [animationParent] = useAutoAnimate()

    return (
        <main>
            <div className="flex flex-col justify-between gap-2 md:flex-row">
                <h1>Building Team</h1>
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    onChange={(event) => setQuery(event.target.value)}
                    className="rounded-2xl px-4 py-2 text-black outline-none md:w-60"
                />
            </div>
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
                                    ? "font-extrabold text-light"
                                    : "text-gray"
                            } btn-transparent text-xl`}
                            onClick={() => setTeamStyle("Double")}
                        >
                            Double
                        </button>
                        <button
                            className={`${
                                teamStyle === "Single"
                                    ? "font-extrabold text-light"
                                    : "text-gray"
                            } btn-transparent text-xl`}
                            onClick={() => setTeamStyle("Single")}
                        >
                            Single
                        </button>
                    </div>
                </div>

                <div className="pokemon-card-grid" ref={animationParent}>
                    {pokemonOnTeam.length === 0 ? (
                        //placeholder for when there are no cards to keep page structure
                        <div className="aspect-[4/5] w-full" />
                    ) : (
                        pokemonOnTeam?.map((pokemon) => {
                            return (
                                <button
                                    key={pokemon?.id}
                                    className="pokemon-card"
                                    onClick={() =>
                                        removePokemonFromTeam(pokemon!.id)
                                    }
                                >
                                    <PokemonCard
                                        pokemonName={pokemon!.name}
                                        createdPokemon={pokemon}
                                    />
                                </button>
                            )
                        })
                    )}
                </div>
                <button className="rounded-2xl p-3" onClick={buildTeam}>
                    Build Team
                </button>
            </div>
            {filteredPokemon?.length === 0 && pokemons && (
                <PokemonEmpty query={query} hasPokemon={pokemons?.length > 0} />
            )}
            {pokemons == null ? (
                <SkeletonPokemonGrid />
            ) : (
                <div className="pokemon-card-grid" ref={animationParent}>
                    {filteredPokemon?.map((pokemon) => {
                        const favorited =
                            pokemon.favorited[0]?.userId === pokemon.userId
                        return (
                            <button
                                className="pokemon-card"
                                onClick={() => addPokemonToTeam(pokemon)}
                                key={pokemon.id}
                            >
                                <PokemonCard
                                    pokemonName={pokemon.name}
                                    createdPokemon={pokemon}
                                    favorite={favorited}
                                />
                            </button>
                        )
                    })}
                </div>
            )}
        </main>
    )
}

export default BuildTeam
