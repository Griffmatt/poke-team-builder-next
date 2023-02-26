import { useSession } from "next-auth/react"
import { type FormEvent, useReducer, useState, useEffect } from "react"

import { MovesInput } from "./formInputs/movesInput"

import useHandleEvChange from "hooks/useHandleEvChange"
import useHandleIvChange from "hooks/useHandleIvChange"
import { NATURES } from "assets/natures"

import { useUpdatePokemonMutation } from "mutations/updatePokemonMutation"
import { useBuildPokemonMutation } from "mutations/buildPokemonMutation"

import { type Pokemon, type CreatedPokemon } from "types/trpc"
import React from "react"
import { PokemonImage } from "components/pokemonCards/pokemonImage"
import { TERA_TYPES } from "assets/teraTypes"
import { useSelectedContext } from "context/selectedContext"
import { DataInput } from "./formInputs/dataInput"

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
    const [openInput, setOpenInput] = useState("")
    const [pokemonData, setPokemonData] = useReducer(
        (initial: PokemonValues, data: Partial<PokemonValues>) => {
            return { ...initial, ...data }
        },
        useFormatInitialData(pokemon, heldItems, createdPokemon)
    )
    const { ability, nature, heldItem, teraType, moves } = pokemonData

    const { selectedPokemonData } = useSelectedContext()

    useEffect(() => {
        window.addEventListener("click", () => setOpenInput(""))

        return () => window.removeEventListener("click", () => setOpenInput(""))
    }, [])

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

    const { buildPokemon, buildMutation } = useBuildPokemonMutation(
        session?.user?.id as string,
        pokemon,
        { ...pokemonData, ivs, evs }
    )

    const { updatePokemon, updateMutation } = useUpdatePokemonMutation(
        session?.user?.id as string,
        createdPokemon as CreatedPokemon,
        { ...pokemonData, ivs, evs }
    )

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const user = session?.user
        if (!user) return null

        if (createdPokemon) {
            updatePokemon(createdPokemon.id)
            return null
        }
        buildPokemon()
        return null
    }

    const abilities = pokemon.abilities.map(
        (abilityData) => abilityData.ability.name
    )

    return (
        <form
            className="grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3"
            onSubmit={(event) => handleSubmit(event)}
        >
            <div className="h-fit w-full lg:row-span-2">
                <PokemonImage
                    pokemonName={pokemon.name}
                    createdPokemon={createdPokemon}
                />
            </div>
            <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
                <div>
                    <h2>Pokemon Info</h2>
                    <DataInput
                        dataType="ability"
                        data={ability}
                        setData={setPokemonData}
                        items={abilities}
                        openInput={openInput}
                        setOpenInput={setOpenInput}
                        pokemonName={pokemon.name}
                    />
                    <DataInput
                        dataType="nature"
                        data={nature}
                        setData={setPokemonData}
                        items={NATURES}
                        openInput={openInput}
                        setOpenInput={setOpenInput}
                        pokemonName={pokemon.name}
                    />
                    <DataInput
                        dataType="heldItem"
                        data={heldItem}
                        setData={setPokemonData}
                        items={heldItems}
                        openInput={openInput}
                        setOpenInput={setOpenInput}
                        pokemonName={pokemon.name}
                    />
                    <DataInput
                        dataType="teraType"
                        data={teraType}
                        setData={setPokemonData}
                        items={TERA_TYPES}
                        openInput={openInput}
                        setOpenInput={setOpenInput}
                        pokemonName={pokemon.name}
                    />
                </div>
                <div>
                    <h2>Moves</h2>
                    {moves.map((move, index) => {
                        const pokemonMoves = pokemon.moves.map(
                            (moveData) => moveData.move.name
                        )
                        return (
                            <React.Fragment key={move}>
                                <MovesInput
                                    order={index}
                                    moves={pokemonMoves}
                                    move={move}
                                    setData={setPokemonData}
                                    currentMoves={moves}
                                    openInput={openInput}
                                    setOpenInput={setOpenInput}
                                    pokemonName={pokemon.name}
                                />
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
            <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2">
                <div>
                    <h2>Evs</h2>
                    {evs.map((stat) => {
                        return (
                            <label key={`${stat.stat}EV`}>
                                {stat.stat}
                                <div className="flex w-full gap-2">
                                    <button
                                        className="aspect-square h-7 rounded-xl text-xl font-bold text-primary dark:bg-dark-3"
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
                                        className="aspect-square h-7 rounded-xl text-xl font-bold text-primary dark:bg-dark-3"
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
                                        className="w-8 rounded-xl text-xl font-bold text-primary dark:bg-dark-3"
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
                                        className="w-8 rounded-xl text-xl font-bold text-primary dark:bg-dark-3"
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
                className="w-full rounded-xl p-4 sm:col-start-2 lg:col-start-3"
                type="submit"
                disabled={buildMutation.isLoading || updateMutation.isLoading}
            >
                {createdPokemon ? "Update Pokemon" : "Build Pokemon"}
            </button>
        </form>
    )
}

const useFormatInitialData = (
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

    const checkAbility = () => {
        if (
            selectedPokemonData.ability &&
            pokemonAbilities.includes(selectedPokemonData.ability)
        ) {
            return selectedPokemonData.ability
        }

        return pokemonAbilities[0]
    }

    const selectedAbility = checkAbility()

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
