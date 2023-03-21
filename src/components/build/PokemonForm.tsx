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
import { TERA_TYPES } from "assets/teraTypes"
import { useSelectedContext } from "context/selectedContext"
import { DataInput } from "./formInputs/dataInput"
import { InfoCard } from "components/pokemonCards/infoCard"
import { StatButton } from "./ui/statButton"

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
    const { data: session } = useSession({
        required: true,
    })
    const { selectedPokemonData } = useSelectedContext()

    const [openInput, setOpenInput] = useState("")
    const [pokemonData, setPokemonData] = useReducer(
        (initial: PokemonValues, data: Partial<PokemonValues>) => {
            return { ...initial, ...data }
        },
        useFormatInitialData(pokemon, heldItems, createdPokemon)
    )
    const { ability, nature, heldItem, teraType, moves } = pokemonData

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
            className="grid gap-2 md:grid-cols-2 lg:grid-cols-3"
            onSubmit={(event) => handleSubmit(event)}
        >
            <div className="col-span-full grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <InfoCard pokemon={pokemon} />
                <div className="">
                    <h2>Pokemon Info</h2>
                    <DataInput
                        dataType="ability"
                        selected={ability}
                        setData={setPokemonData}
                        items={abilities}
                        openInput={openInput}
                        setOpenInput={setOpenInput}
                        pokemonName={pokemon.name}
                    />
                    <DataInput
                        dataType="nature"
                        selected={nature}
                        setData={setPokemonData}
                        items={NATURES}
                        openInput={openInput}
                        setOpenInput={setOpenInput}
                        pokemonName={pokemon.name}
                    />
                    <DataInput
                        dataType="heldItem"
                        selected={heldItem}
                        setData={setPokemonData}
                        items={heldItems}
                        openInput={openInput}
                        setOpenInput={setOpenInput}
                        pokemonName={pokemon.name}
                    />
                    <DataInput
                        dataType="teraType"
                        selected={teraType}
                        setData={setPokemonData}
                        items={TERA_TYPES}
                        openInput={openInput}
                        setOpenInput={setOpenInput}
                        pokemonName={pokemon.name}
                    />
                </div>
                <div className="col-span-full lg:col-span-1">
                    <h2>Moves</h2>
                    <div className="col-span-full grid md:grid-cols-2 md:gap-2 lg:grid-cols-1 lg:gap-0">
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
            </div>
            <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2 lg:col-start-2">
                <div>
                    <h2>Evs</h2>
                    {evs.map(({ stat, value }) => {
                        return (
                            <label key={`${stat}EV`}>
                                {stat}
                                <div className="flex w-full gap-2">
                                    <StatButton
                                        handleClick={() => decreaseEv(stat)}
                                        type="-"
                                    />
                                    <input
                                        className="w-full"
                                        value={value}
                                        inputMode="numeric"
                                        onChange={(event) =>
                                            handleEvChange(
                                                Number(event.target.value),
                                                stat
                                            )
                                        }
                                    />
                                    <StatButton
                                        handleClick={() => increaseEv(stat)}
                                        type="+"
                                    />
                                </div>
                            </label>
                        )
                    })}
                </div>
                <div>
                    <h2>Ivs</h2>
                    {ivs.map(({ stat, value }) => {
                        return (
                            <label key={`${stat}IV`}>
                                {stat}
                                <div className="flex w-full gap-2">
                                    <StatButton
                                        handleClick={() => decreaseIv(stat)}
                                        type="-"
                                    />
                                    <input
                                        className="w-full"
                                        inputMode="numeric"
                                        value={value}
                                        onChange={(event) =>
                                            handleIvChange(
                                                Number(event.target.value),
                                                stat
                                            )
                                        }
                                    />
                                    <StatButton
                                        handleClick={() => increaseIv(stat)}
                                        type="+"
                                    />
                                </div>
                            </label>
                        )
                    })}
                </div>
            </div>
            <button
                className="h-fit w-full rounded-xl py-2 sm:col-start-2 lg:col-start-3"
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
        shiny:
            createdPokemon?.shiny ??
            Math.floor(Math.random() * SHINY_ODDS) + 1 === 7,
    }
}
