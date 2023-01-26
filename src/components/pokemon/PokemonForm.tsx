import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import type { inferProcedureOutput } from "@trpc/server"
import { type AppRouter } from "../../server/api/root"

import { MovesInput } from "./movesInput"

import useHandleEvChange from "../../hooks/useHandleEvChange"
import useHandleIvChange from "../../hooks/useHandleIvChange"
import formatString from "../../utils/formatString"
import { natures } from "../../assets/natures"

import { Pokemon } from "pokenode-ts"
import { api } from "../../utils/api"
import { useRouter } from "next/router"
import { PokemonCard } from "../pokemonCard"

type CreatedPokemon = inferProcedureOutput<
    AppRouter["pokemon"]["getSinglePokemon"]
>

interface Props {
    pokemon: Pokemon
    heldItems: { name: string }[]
    createdPokemon?: CreatedPokemon
}

const PokemonForm = ({ pokemon, heldItems, createdPokemon }: Props) => {
    console.log(createdPokemon)
    const { data: session } = useSession()
    const router = useRouter()
    const SHINY_ODDS = 10

    const [ability, setAbility] = useState<string>(
        createdPokemon?.nature ?? pokemon.abilities[0].ability.name
    )
    const [nature, setNature] = useState<string>("Adamant")
    const [heldItem, setHeldItem] = useState<string>(
        createdPokemon?.heldItem ?? heldItems[0].name
    )

    const [firstMove, setFirstMove] = useState<string>(
        createdPokemon?.moves[0].move ?? pokemon.moves[0].move.name
    )
    const [secondMove, setSecondMove] = useState<string>(
        createdPokemon?.moves[1].move ?? pokemon.moves[1].move.name
    )
    const [thirdMove, setThirdMove] = useState<string>(
        createdPokemon?.moves[2].move ?? pokemon.moves[2].move.name
    )
    const [fourthMove, setFourthMove] = useState<string>(
        createdPokemon?.moves[3].move ?? pokemon.moves[3].move.name
    )

    const {
        evsArr: evs,
        decreaseEv,
        increaseEv,
        handleEvChange,
    } = useHandleEvChange(createdPokemon?.evs)

    const {
        ivsArr: ivs,
        decreaseIv,
        increaseIv,
        handleIvChange,
    } = useHandleIvChange(createdPokemon?.ivs)

    const createMutation = api.pokemon.postPokemon.useMutation({
        onSuccess: () => {
            router.push("/pokemon")
        },
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const user = session?.user
        if (!user) return null
        const pokemonData = {
            userId: session?.user?.id as string,
            name: pokemon.name,
            ability: ability,
            nature: nature,
            heldItem: heldItem,
            shiny: Math.floor(Math.random() * SHINY_ODDS) + 1 === 7,
            moves: {
                createMany: {
                    data: [
                        { move: firstMove, moveOrder: 1 },
                        { move: secondMove, moveOrder: 2 },
                        { move: thirdMove, moveOrder: 3 },
                        { move: fourthMove, moveOrder: 4 },
                    ],
                },
            },
            evs: { createMany: { data: evs } },
            ivs: { createMany: { data: ivs } },
        }

        if (createdPokemon) {
            return null
        }

        createMutation.mutate(pokemonData)

        return null
    }

    return (
        <form
            className="grid gap-3 p-2 md:grid-cols-4 lg:grid-cols-3"
            onSubmit={(event) => handleSubmit(event)}
        >
            <div className="w-full md:col-span-2 md:row-span-3 lg:col-span-1">
                <PokemonCard
                    pokemonName={pokemon.name}
                    createdPokemon={createdPokemon}
                />
            </div>
            <div>
                <h2>Pokemon Info</h2>
                <label className="flex flex-col">
                    Ability
                    <select
                        onChange={(event) => setAbility(event.target.value)}
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
                <label className="flex flex-col">
                    Nature
                    <select
                        className="text-dark"
                        onChange={(event) => setNature(event.target.value)}
                        value={formatString(nature)}
                    >
                        {natures.map((nature: string) => {
                            return <option key={nature}>{nature}</option>
                        })}
                    </select>
                </label>
                <label className="flex flex-col">
                    Held Item
                    <select
                        onChange={(event) => setHeldItem(event.target.value)}
                        value={formatString(heldItem)}
                    >
                        {heldItems
                            .sort((a, b) => {
                                if (a.name < b.name) {
                                    return -1
                                }
                                if (a.name > b.name) {
                                    return 1
                                }
                                return 0
                            })
                            .map((heldItem: any) => {
                                return (
                                    <option key={heldItem.name}>
                                        {formatString(heldItem.name)}
                                    </option>
                                )
                            })}
                    </select>
                </label>
            </div>
            <div>
                <h2>Moves</h2>
                <MovesInput
                    order={"First"}
                    moves={pokemon.moves}
                    move={firstMove}
                    setMove={setFirstMove}
                />
                <MovesInput
                    order={"Second"}
                    moves={pokemon.moves}
                    move={secondMove}
                    setMove={setSecondMove}
                />
                <MovesInput
                    order={"Third"}
                    moves={pokemon.moves}
                    move={thirdMove}
                    setMove={setThirdMove}
                />
                <MovesInput
                    order={"Fourth"}
                    moves={pokemon.moves}
                    move={fourthMove}
                    setMove={setFourthMove}
                />
            </div>
            <div>
                <h2>Evs</h2>
                {evs.map((stat) => {
                    return (
                        <label className="flex flex-col" key={`${stat.stat}EV`}>
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
                <h2>ivs</h2>
                {ivs.map((stat) => {
                    return (
                        <label className="flex flex-col" key={`${stat.stat}EV`}>
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
            <button
                className="w-full rounded-xl p-4 md:col-span-2"
                type="submit"
            >
                {createdPokemon ? "Update Pokemon" : "Create Pokemon"}
            </button>
        </form>
    )
}

export { PokemonForm }
