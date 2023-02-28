import { PokemonCard } from "components/pokemonCards/pokemonCard"
import { PreviewCard } from "components/pokemonCards/previewCard"
import React from "react"
import { useState } from "react"
import { type CreatedPokemon } from "types/trpc"

interface Props {
    pokemonRow: CreatedPokemon[]
    addPokemonToTeam: (pokemon: CreatedPokemon | null) => null
    setSelectedRow: (value: React.SetStateAction<number | null>) => void
    selectedRow: number | null
    index: number
}

export const BuildTeamGridRow = ({
    pokemonRow,
    addPokemonToTeam,
    setSelectedRow,
    selectedRow,
    index,
}: Props) => {
    const [selectedPokemon, setSelectedPokemon] =
        useState<CreatedPokemon | null>(null)
    const rowSelected = index === selectedRow
    const selected = selectedPokemon && rowSelected
    return (
        <>
            {pokemonRow?.map((pokemon) => {
                const favorited =
                    pokemon.favorited[0]?.userId === pokemon.userId
                const pokemonSelected =
                    pokemon.id === selectedPokemon?.id && rowSelected
                return (
                    <React.Fragment key={pokemon.id}>
                        <button
                            className={` ${
                                pokemonSelected
                                    ? "pokemon-card-selected"
                                    : "pokemon-card"
                            }`}
                            onClick={() => {
                                if (
                                    selectedPokemon?.id === pokemon.id &&
                                    rowSelected
                                ) {
                                    setSelectedRow(null)
                                    return
                                }
                                setSelectedPokemon(pokemon)
                                setSelectedRow(index)
                            }}
                        >
                            <PokemonCard
                                pokemonName={pokemon.name}
                                createdPokemon={pokemon}
                                favorited={favorited}
                            />
                        </button>
                    </React.Fragment>
                )
            })}

            <div
                className={` col-span-full row-start-2 h-fit w-full overflow-hidden transition-max-height duration-300 ${
                    selected ? "max-h-80" : "max-h-0"
                }`}
            >
                <div className="grid h-fit w-full gap-2 py-4">
                    <div className="flex justify-center">
                        {selectedPokemon && (
                            <PreviewCard createdPokemon={selectedPokemon} />
                        )}
                    </div>
                    <button
                        className="rounded-2xl p-3"
                        onClick={() => {
                            void addPokemonToTeam(selectedPokemon)
                            setSelectedRow(null)
                        }}
                    >
                        Add To Team
                    </button>
                </div>
            </div>
        </>
    )
}
