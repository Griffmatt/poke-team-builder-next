import { type CreatedPokemon } from "types/trpc"
import { api } from "utils/api"
import { formatString } from "utils/formatString"
import { LoadingCardWithStats } from "./ui/loadingCardWithStats"
import { PokemonImage } from "./pokemonImage"

interface Props {
    createdPokemon: CreatedPokemon
}

export const HorizontalPokemonCard = ({ createdPokemon }: Props) => {
    const {
        data: pokemon,
        isLoading,
        error,
    } = api.pokeApi.getPokemonByName.useQuery({
        name: createdPokemon.name,
    })

    if (isLoading) return <LoadingCardWithStats />

    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="grid gap-2 border border-dark-3 bg-dark-2 p-2 text-center">
            <div className="flex justify-around">
                <div className="aspect-square h-12">
                    <PokemonImage
                        pokemonName={pokemon.name}
                        createdPokemon={createdPokemon}
                    />
                </div>
                <div className="grid w-full grid-cols-2 justify-around sm:flex">
                    <div>
                        <h2>Tera</h2>
                        <p>{formatString(createdPokemon.teraType)}</p>
                    </div>
                    <div>
                        <h2>Ability</h2>
                        <p>{formatString(createdPokemon.ability)}</p>
                    </div>
                    <div>
                        <h2>Nature</h2>
                        <p>{formatString(createdPokemon.nature)}</p>
                    </div>
                    <div>
                        <h2>Item</h2>
                        <p>{formatString(createdPokemon.heldItem)}</p>
                    </div>
                    <div className="col-span-2">
                        <h2>Moves</h2>
                        <div className="flex  justify-center gap-2">
                            {createdPokemon.moves.map((move) => {
                                return (
                                    <p key={move.move}>
                                        {formatString(move.move)}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
                <div>
                    <h2>EVs</h2>
                    <div className="flex justify-around">
                        {createdPokemon.evs.map((ev) => {
                            return (
                                <div key={`${ev.stat}EV`}>
                                    <h3>{ev.stat}</h3>
                                    <p>{ev.value}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2>IVs</h2>
                    <div className="flex justify-around">
                        {createdPokemon.ivs.map((iv) => {
                            return (
                                <div key={`${iv.stat}IV`}>
                                    <h3>{iv.stat}</h3>
                                    <p>{iv.value}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
