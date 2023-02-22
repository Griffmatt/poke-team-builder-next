import { type CreatedPokemon } from "types/trpc"
import { api } from "utils/api"
import { formatString } from "utils/formatString"
import { LoadingCardWithStats } from "./ui/loadingCardWithStats"
import { PokemonImage } from "./pokemonImage"

interface Props {
    createdPokemon: CreatedPokemon
}

export const PreviewCard = ({ createdPokemon }: Props) => {
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
        <div className="w-full bg-dark-2 text-center lg:w-fit lg:min-w-[60%]">
            <div className="flex">
                <div className="flex items-center justify-center border border-dark-3 p-2">
                    <div className="aspect-square h-12">
                        <PokemonImage
                            pokemonName={pokemon.name}
                            createdPokemon={createdPokemon}
                        />
                    </div>
                </div>
                <div className="grid w-full grid-cols-2">
                    <div className="grid border border-dark-3">
                        <div className="p-1">
                            <p>{formatString(createdPokemon.teraType)}</p>
                        </div>
                        <div className="border-t border-dark-3 p-1">
                            <p>{formatString(createdPokemon.ability)}</p>
                        </div>
                        <div className="border-t border-dark-3 p-1">
                            <p>{formatString(createdPokemon.nature)}</p>
                        </div>
                        <div className="border-t border-dark-3 p-1">
                            <p>{formatString(createdPokemon.heldItem)}</p>
                        </div>
                    </div>
                    <div className="grid border border-dark-3">
                        {createdPokemon.moves.map((move) => {
                            return (
                                <div key={move.move} className="p-1">
                                    <p className="truncate">
                                        {formatString(move.move)}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="grid border border-dark-3 md:grid-cols-2">
                <div className="p-1">
                    <div className="grid grid-cols-6">
                        {createdPokemon.evs.map((ev) => {
                            return (
                                <div key={`${ev.stat}EV`}>
                                    <h5>{ev.stat}</h5>
                                    <p>{ev.value}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="p-1">
                    <div className="grid grid-cols-6">
                        {createdPokemon.ivs.map((iv) => {
                            return (
                                <div key={`${iv.stat}IV`}>
                                    <h5 className="hidden md:block">
                                        {iv.stat}
                                    </h5>
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
