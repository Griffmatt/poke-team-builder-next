import { useSession } from "next-auth/react"
import React, { useLayoutEffect, useState } from "react"
import { PokemonEmpty } from "components/pokemonGrids/ui/pokemonEmpty"
import { api } from "utils/api"
import { useDebounceQuery } from "hooks/useDebounceQuery"
import { useScreenSize } from "hooks/useScreenSize"
import { BuildTeamGridRow } from "components/build/team/buildTeamGridRow"
import { PokemonImage } from "components/pokemonCards/pokemonImage"
import { type CreatedPokemon } from "types/trpc"
import { SkeletonPokemonGrid } from "components/pokemonGrids/ui/skeletonPokemonGrid"

interface Props {
    pokemonOnTeam: CreatedPokemon[]
    addPokemonToTeam: (pokemon: CreatedPokemon | null) => null
}

export const BuildTeamGrid = ({ pokemonOnTeam, addPokemonToTeam }: Props) => {
    const { data: session } = useSession()
    const { width } = useScreenSize()

    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounceQuery(query)

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

    if (isLoading)
        return (
            <div>
                <div className="sticky top-[3.375rem] z-30 grid gap-2 bg-dark/95 py-2 md:grid-cols-2">
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
        )
    if (error) return <div>Error: {error.message}</div>

    const filteredPokemon = pokemons.filter(
        (pokemon) =>
            !pokemonOnTeam.some(
                (pokemonFilter) => pokemon.id === pokemonFilter?.id
            ) && pokemon.name.includes(debouncedQuery)
    )

    const pokemonRows = []
    let i = 0
    while (pokemonRows.length !== filteredPokemon.length) {
        pokemonRows.push(filteredPokemon.slice(i, i + gridLength))
        i += gridLength
    }
    return (
        <div>
            <div className="pointer-events-none sticky top-[3.375rem] z-50 flex justify-between bg-dark/95 py-2 lg:top-0 lg:bg-transparent">
                <div className="hidden h-10 grid-cols-6 rounded bg-dark-2 p-1 md:grid md:w-60">
                    {pokemonOnTeam.map((pokemon) => {
                        return (
                            <div key={pokemon.id} className="aspect-square h-8">
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
                <PokemonEmpty query={query} hasPokemon={pokemons.length > 0} />
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
    )
}
