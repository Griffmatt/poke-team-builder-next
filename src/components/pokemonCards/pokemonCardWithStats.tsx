import { useSession } from "next-auth/react"
import { useState } from "react"
import { useAddFavoritePokemonMutation } from "mutations/addFavoritePokemonMutation"
import { useRemoveFavoritePokemonMutation } from "mutations/removeFavoritePokemonMutation"
import { type CreatedPokemon } from "types/trpc"
import { api } from "utils/api"
import { formatString } from "utils/formatString"
import { FavoritedButton } from "../ui/favoritedButton"
import Image from "next/image"
import { LoadingCardWithStats } from "./ui/loadingCardWithStats"

interface Props {
    createdPokemon: CreatedPokemon
    favorite: boolean
}

// Don't wrap with class so that there is skeleton of card when loading data

export const PokemonCardWithStats = ({ createdPokemon, favorite }: Props) => {
    const { data: session } = useSession()

    const [topPoke] = useState((createdPokemon?.favorited?.length ?? 0) > 100)

    const {
        data: pokemon,
        isLoading,
        error,
    } = api.pokeApi.getPokemonByName.useQuery({
        name: createdPokemon.name,
    })

    const addFavoritePokemon = useAddFavoritePokemonMutation(createdPokemon)
    const removeFavoritePokemon =
        useRemoveFavoritePokemonMutation(createdPokemon)

    const ids = {
        pokemonId: createdPokemon.id,
    }
    const removeFavorite = () => {
        if (addFavoritePokemon.isLoading || removeFavoritePokemon.isLoading)
            return null
        removeFavoritePokemon.mutate(ids)
    }

    const addFavorite = () => {
        if (addFavoritePokemon.isLoading || removeFavoritePokemon.isLoading)
            return null

        addFavoritePokemon.mutate(ids)
    }

    if (isLoading) return <LoadingCardWithStats />

    if (error) return <div>Error: {error.message}</div>

    const pokemonImage = createdPokemon.shiny
        ? pokemon.sprites.front_shiny
        : pokemon.sprites.front_default
    return (
        <div className="grid gap-1 text-center">
            <h2>{formatString(createdPokemon.name)}</h2>
            <div className="h-fit justify-between lg:flex">
                <div className="relative my-auto aspect-square w-full">
                    {pokemonImage && (
                        <Image
                            src={pokemonImage}
                            className="aspect-square w-full"
                            alt={pokemon.name}
                            width="96"
                            height="96"
                        />
                    )}
                    {session?.user?.id && (
                        <FavoritedButton
                            favorited={favorite}
                            addFavorite={addFavorite}
                            removeFavorite={removeFavorite}
                        />
                    )}
                    {topPoke && (
                        <div className="absolute top-0 left-0 h-10 w-10 rounded-full">
                            Top Poke
                        </div>
                    )}
                </div>
                <div className="h-fit lg:w-[50%]">
                    <div>
                        <h2>Type</h2>
                        <div className="flex justify-center gap-2">
                            {pokemon?.types.map((type) => {
                                return (
                                    <p key={type.type.name}>
                                        {formatString(type.type.name)}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h2>Tera Type</h2>
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
                        <h2>Held Item</h2>
                        <p>{formatString(createdPokemon.heldItem)}</p>
                    </div>
                    <div className="mx-auto w-fit">
                        <h2>Moves</h2>
                        <div className="grid grid-cols-2 gap-1 lg:grid-cols-1">
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
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <h2>EVs</h2>
                    <div className="grid grid-cols-3">
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
                    <div className="grid grid-cols-3">
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
