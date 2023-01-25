import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'

import PokemonCard from './pokemonCard'
import MovesInput from './movesInput'

import useHandleEvChange from '../../hooks/useHandleEvChange'
import useHandleIvChange from '../../hooks/useHandleIvChange'
import firstLetterUpperCase from '../../utils/firstLetterUpperCase'

import { Pokemon } from 'pokenode-ts'

interface EvStats {
    hitpointsEv: number
    attackEv: number
    defenseEv: number
    specialAttackEv: number
    specialDefenseEv: number
    speedEv: number
}

interface IvStats {
    hitpointsIv: number
    attackIv: number
    defenseIv: number
    specialAttackIv: number
    specialDefenseIv: number
    speedIv: number
}

const natures = [
    'Adamant',
    'Bashful',
    'Bold',
    'Brave',
    'Calm',
    'Careful',
    'Docile',
    'Gentle',
    'Hardy',
    'Hasty',
    'Impish',
    'Jolly',
    'Lax',
    'Lonely',
    'Mild',
    'Modest',
    'Naive',
    'Naughty',
    'Quiet',
    'Quirky',
    'Rash',
    'Relaxed',
    'Sassy',
    'Serious',
    'Timid',
]

const stats = [
    { name: 'Hitpoints', evValue: 'hitpointsEv', ivValue: 'hitpointsIv' },
    { name: 'Attack', evValue: 'attackEv', ivValue: 'attackIv' },
    { name: 'Defense', evValue: 'defenseEv', ivValue: 'defenseIv' },
    {
        name: 'Special Attack',
        evValue: 'specialAttackEv',
        ivValue: 'specialAttackIv',
    },
    {
        name: 'Special Defense',
        evValue: 'specialDefenseEv',
        ivValue: 'specialDefenseIv',
    },
    { name: 'Speed', evValue: 'speedEv', ivValue: 'speedIv' },
]

interface Props {
    pokemon: Pokemon
    heldItems: { name: string }[]
}

const CreatePokemonForm = ({ pokemon, heldItems }: Props) => {
    const { data: session } = useSession()

    const [ability, setAbility] = useState<string>(
        pokemon.abilities[0]?.ability.name ?? ''
    )
    const [nature, setNature] = useState<string>('Adamant')
    const [heldItem, setHeldItem] = useState<string>(heldItems[0]?.name ?? '')

    const [firstMove, setFirstMove] = useState<string>(
        pokemon.moves[0]?.move.name ?? ''
    )
    const [secondMove, setSecondMove] = useState<string>(
        pokemon.moves[1]?.move.name ?? ''
    )
    const [thirdMove, setThirdMove] = useState<string>(
        pokemon.moves[2]?.move.name ?? ''
    )
    const [fourthMove, setFourthMove] = useState<string>(
        pokemon.moves[3]?.move.name ?? ''
    )

    const { evs, decreaseEv, increaseEv, handleEvChange } = useHandleEvChange()

    const { ivs, decreaseIv, increaseIv, handleIvChange } = useHandleIvChange()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = {
            userId: session?.user?.id,
            name: pokemon.name,
            ability: ability,
            nature: nature,
            heldItem: heldItem,
            moves: [firstMove, secondMove, thirdMove, fourthMove],
            stats: [{ ...evs }, { ...ivs }],
        }
        return data
    }

    return (
        <form
            className="grid gap-3 p-2 lg:grid-cols-4"
            onSubmit={(event) => handleSubmit(event)}
        >
            <div className="w-full md:col-span-2 md:row-span-3">
                <PokemonCard pokemonName={pokemon.name} />
            </div>
            <div>
                <h2>Pokemon Info</h2>
                <label className="flex flex-col">
                    Ability
                    <select
                        onChange={(event) => setAbility(event.target.value)}
                        value={firstLetterUpperCase(ability)}
                    >
                        {pokemon.abilities.map((ability) => {
                            return (
                                <option key={ability.ability.name}>
                                    {firstLetterUpperCase(ability.ability.name)}
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
                        value={firstLetterUpperCase(nature)}
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
                        value={firstLetterUpperCase(heldItem)}
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
                                        {firstLetterUpperCase(heldItem.name)}
                                    </option>
                                )
                            })}
                    </select>
                </label>
            </div>
            <div>
                <h2>Moves</h2>
                <MovesInput
                    order={'First'}
                    moves={pokemon.moves}
                    move={firstMove}
                    setMove={setFirstMove}
                />
                <MovesInput
                    order={'Second'}
                    moves={pokemon.moves}
                    move={secondMove}
                    setMove={setSecondMove}
                />
                <MovesInput
                    order={'Third'}
                    moves={pokemon.moves}
                    move={thirdMove}
                    setMove={setThirdMove}
                />
                <MovesInput
                    order={'Fourth'}
                    moves={pokemon.moves}
                    move={fourthMove}
                    setMove={setFourthMove}
                />
            </div>
            <div>
                <h2>Evs</h2>
                {stats.map((stat) => {
                    return (
                        <label className="flex flex-col" key={stat.evValue}>
                            {stat.name}
                            <div className="flex w-full gap-2">
                                <button
                                    className="w-8 rounded-xl"
                                    onClick={() => decreaseEv(stat.evValue)}
                                    type="button"
                                >
                                    -
                                </button>
                                <input
                                    className="w-full"
                                    value={evs[stat.evValue as keyof EvStats]}
                                    onChange={(event) =>
                                        handleEvChange(
                                            Number(event.target.value),
                                            stat.evValue
                                        )
                                    }
                                />
                                <button
                                    className="w-8 rounded-xl"
                                    onClick={() => increaseEv(stat.evValue)}
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
                {stats.map((stat) => {
                    return (
                        <label className="flex flex-col" key={stat.ivValue}>
                            {stat.name}
                            <div className="flex w-full gap-2">
                                <button
                                    className="w-8 rounded-xl"
                                    onClick={() => decreaseIv(stat.ivValue)}
                                    type="button"
                                >
                                    -
                                </button>
                                <input
                                    className="w-full"
                                    value={ivs[stat.ivValue as keyof IvStats]}
                                    onChange={(event) =>
                                        handleIvChange(
                                            Number(event.target.value),
                                            stat.ivValue
                                        )
                                    }
                                />
                                <button
                                    className="w-8 rounded-xl"
                                    onClick={() => increaseIv(stat.ivValue)}
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
                Create Pokemon
            </button>
        </form>
    )
}

export default CreatePokemonForm
