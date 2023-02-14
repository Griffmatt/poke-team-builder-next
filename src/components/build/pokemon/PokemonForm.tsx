import { useSession } from "next-auth/react"
import { FormEvent, useReducer } from "react"

import { MovesInput } from "./movesInput"

import useHandleEvChange from "hooks/useHandleEvChange"
import useHandleIvChange from "hooks/useHandleIvChange"
import { formatString } from "utils/formatString"
import { NATURES } from "assets/natures"

import { updatePokemonMutation } from "mutations/updatePokemonMutation"
import { buildPokemonMutation } from "mutations/buildPokemonMutation"
import { Pokemon } from "pokenode-ts"
import { CreatedPokemon } from "types/trpc"
import React from "react"
import { PokemonImage } from "components/pokemonCards/pokemonImage"
import { TERA_TYPES } from "assets/teraTypes"
import { useSelectedContext } from "context/selectedContext"

interface Props {
    pokemon: Pokemon
    heldItems: string[]
    createdPokemon?: CreatedPokemon
}

interface PokemonValues {
    ability: string
    nature: string
    heldItem: string
    shiny: boolean
    teraType: string
    moves: string[]
}

export const PokemonForm = ({ pokemon, heldItems, createdPokemon }: Props) => {
    const { data: session } = useSession()
    const [pokemonData, setPokemonData] = useReducer(
        (initial: PokemonValues, data: Partial<PokemonValues>) => {
            return { ...initial, ...data }
        },
        formatInitialData(pokemon, heldItems, createdPokemon)
    )
    const { ability, nature, heldItem, shiny, teraType, moves } = pokemonData

    const { selectedPokemonData } = useSelectedContext()

    const {
        evsArr: evs,
        decreaseEv,
        increaseEv,
        handleEvChange,
    } = useHandleEvChange(createdPokemon?.evs ?? selectedPokemonData.stats)

    const {
        ivsArr: ivs,
        decreaseIv,
        increaseIv,
        handleIvChange,
    } = useHandleIvChange(createdPokemon?.ivs)

    const buildPokemon = buildPokemonMutation(
        session?.user!.id as string,
        pokemon,
        { ...pokemonData, ivs, evs }
    )

    const updatePokemon = updatePokemonMutation(
        session?.user!.id as string,
        createdPokemon as CreatedPokemon,
        { ...pokemonData, ivs, evs }
    )

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const user = session?.user
        if (!user) return null
        const movesFormat = [
            {
                move: moves[0],
                moveOrder: 1,
            },
            {
                move: moves[1],
                moveOrder: 2,
            },
            {
                move: moves[2],
                moveOrder: 3,
            },
            {
                move: moves[3],
                moveOrder: 4,
            },
        ]

        if (createdPokemon) {
            const updatePokemonData = {
                id: createdPokemon.id,
                ability: ability,
                nature: nature,
                heldItem: heldItem,
                teraType: teraType,
                moves: movesFormat,
                evs: evs,
                ivs: ivs,
            }
            updatePokemon.mutate(updatePokemonData)
            return null
        }

        const createPokemonData = {
            userId: session?.user!.id,
            name: pokemon.name,
            ability: ability,
            nature: nature,
            heldItem: heldItem,
            shiny: shiny,
            teraType: teraType,
            moves: movesFormat,
            evs: evs,
            ivs: ivs,
        }

        buildPokemon.mutate(createPokemonData)

        return null
    }

    return (
        <form
            className="grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-3"
            onSubmit={(event) => handleSubmit(event)}
        >
            <div className="h-fit w-full lg:row-span-2">
                <PokemonImage
                    pokemon={pokemon}
                    shiny={createdPokemon?.shiny ?? false}
                />
            </div>
            <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
                <div>
                    <h2>Pokemon Info</h2>
                    <label className="grid">
                        Ability
                        <select
                            onChange={(event) =>
                                setPokemonData({ ability: event.target.value })
                            }
                            value={formatString(ability)}
                        >
                            {pokemon.abilities.map((ability) => {
                                return (
                                    <option key={ability.ability.name}>
                                        {formatString(ability.ability.name)}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                    <label className="grid">
                        Nature
                        <select
                            className="text-dark"
                            onChange={(event) =>
                                setPokemonData({ nature: event.target.value })
                            }
                            value={formatString(nature)}
                        >
                            {NATURES.map((nature: string) => {
                                return <option key={nature}>{nature}</option>
                            })}
                        </select>
                    </label>
                    <label className="grid">
                        Held Item
                        <select
                            onChange={(event) =>
                                setPokemonData({ heldItem: event.target.value })
                            }
                            value={formatString(heldItem)}
                        >
                            {heldItems.map((heldItem) => {
                                return (
                                    <option key={heldItem}>
                                        {formatString(heldItem)}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                    <label className="grid">
                        Tera Type
                        <select
                            onChange={(event) =>
                                setPokemonData({ teraType: event.target.value })
                            }
                            value={formatString(teraType)}
                        >
                            {TERA_TYPES.map((type) => {
                                return (
                                    <option key={type}>
                                        {formatString(type)}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                </div>
                <div>
                    <h2>Moves</h2>
                    {pokemonData.moves.map((move, index) => {
                        return (
                            <React.Fragment key={move}>
                                <MovesInput
                                    order={index}
                                    moves={pokemon.moves}
                                    move={move}
                                    setPokemonData={setPokemonData}
                                    currentMoves={pokemonData.moves}
                                />
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
            <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
                <div>
                    <h2>Evs</h2>
                    {evs.map((stat) => {
                        return (
                            <label key={`${stat.stat}EV`}>
                                {stat.stat}
                                <div className="flex w-full gap-2">
                                    <button
                                        className="w-8 rounded-xl"
                                        onClick={() => decreaseEv(stat.stat)}
                                        type="button"
                                    >
                                        -
                                    </button>
                                    <input
                                        className="w-full"
                                        value={stat.value}
                                        inputMode="numeric"
                                        onChange={(event) =>
                                            handleEvChange(
                                                Number(event.target.value),
                                                stat.stat
                                            )
                                        }
                                    />
                                    <button
                                        className="w-8 rounded-xl"
                                        onClick={() => increaseEv(stat.stat)}
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
                    {ivs.map((stat) => {
                        return (
                            <label key={`${stat.stat}IV`}>
                                {stat.stat}
                                <div className="flex w-full gap-2">
                                    <button
                                        className="w-8 rounded-xl"
                                        onClick={() => decreaseIv(stat.stat)}
                                        type="button"
                                    >
                                        -
                                    </button>
                                    <input
                                        className="w-full"
                                        inputMode="numeric"
                                        value={stat.value}
                                        onChange={(event) =>
                                            handleIvChange(
                                                Number(event.target.value),
                                                stat.stat
                                            )
                                        }
                                    />
                                    <button
                                        className="w-8 rounded-xl"
                                        onClick={() => increaseIv(stat.stat)}
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
                type="submit"
                disabled={buildPokemon.isLoading || updatePokemon.isLoading}
            >
                {createdPokemon ? "Update Pokemon" : "Build Pokemon"}
            </button>
        </form>
    )
}

const formatInitialData = (
    pokemon: Pokemon,
    heldItems: string[],
    createdPokemon?: CreatedPokemon
) => {
    const { selectedPokemonData } = useSelectedContext()
    const SHINY_ODDS = 100
    const pokemonAbilities = pokemon.abilities.map(
        (ability) => ability.ability.name
    )
    const pokemonMoves = pokemon.moves.map((move) => move.move.name).sort()
    const unusedMoves = pokemonMoves.filter(
        (move) => !selectedPokemonData.moves.includes(move)
    )

    const movesLength = selectedPokemonData.moves.length

    const selectedAbility = pokemonAbilities.includes(
        selectedPokemonData.ability ?? ""
    )
        ? selectedPokemonData.ability
        : pokemonAbilities[0]

    const selectedMoves = selectedPokemonData.moves.map((move, index) => {
        //prevent moves that the pokemon doesn't know from being entered
        if (pokemonMoves.includes(move)) return move
        return unusedMoves[index]
    })

    return {
        ability: createdPokemon?.ability ?? selectedAbility,
        nature:
            createdPokemon?.nature ?? selectedPokemonData.nature ?? NATURES[0],

        heldItem:
            createdPokemon?.heldItem ??
            selectedPokemonData.heldItem ??
            heldItems[0],
        teraType:
            createdPokemon?.teraType ??
            selectedPokemonData.teraType ??
            pokemon.types[0].type.name,
        moves: [
            createdPokemon?.moves[0].move ?? selectedMoves[0] ?? unusedMoves[0],
            createdPokemon?.moves[1].move ??
                selectedMoves[1] ??
                unusedMoves[1 - movesLength],
            createdPokemon?.moves[2].move ??
                selectedMoves[2] ??
                unusedMoves[2 - movesLength],
            createdPokemon?.moves[3].move ??
                selectedMoves[3] ??
                unusedMoves[3 - movesLength],
        ],

        shiny: createdPokemon?.shiny
            ? createdPokemon.shiny
            : Math.floor(Math.random() * SHINY_ODDS) + 1 === 7,
    }
}
