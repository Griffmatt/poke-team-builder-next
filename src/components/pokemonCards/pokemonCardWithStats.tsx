import { useSession } from "next-auth/react"
import { useAddFavoritePokemonMutation } from "mutations/addFavoritePokemonMutation"
import { useRemoveFavoritePokemonMutation } from "mutations/removeFavoritePokemonMutation"
import { type CreatedPokemon } from "types/trpc"
import { api } from "utils/api"
import { formatString } from "utils/formatString"
import { FavoritedButton } from "../ui/favoritedButton"
import { LoadingCardWithStats } from "./ui/loadingCardWithStats"
import { PokemonImage } from "./pokemonImage"
import { STATS } from "assets/stats"

interface Props {
    createdPokemon: CreatedPokemon
    favorite: boolean
}

// Don't wrap with class so that there is skeleton of card when loading data

export const PokemonCardWithStats = ({ createdPokemon, favorite }: Props) => {
    const { data: session } = useSession()

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
    return (
        <div className="relative w-full bg-dark-2 text-center">
            <h2 className="border border-dark-3 p-1">
                {formatString(pokemon.name)}
            </h2>
            {session?.user?.id && (
                <FavoritedButton
                    favorited={favorite}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    small={true}
                />
            )}
            <div className="flex">
                <div className="flex items-center border border-dark-3 p-2">
                    <div className="aspect-square h-12">
                        <PokemonImage
                            pokemonName={pokemon.name}
                            createdPokemon={createdPokemon}
                        />
                    </div>
                </div>
                <div className="grid w-full md:grid-cols-2">
                    <div className="grid">
                        <h3 className="border border-dark-3 p-1 text-left">
                            Tera{" "}
                            <span className="text-sm font-normal text-gray">
                                {formatString(createdPokemon.teraType)}
                            </span>
                        </h3>
                        <h3 className="border border-dark-3 p-1 text-left">
                            Ability{" "}
                            <span className="text-sm font-normal text-gray">
                                {formatString(createdPokemon.ability)}
                            </span>
                        </h3>
                        <h3 className="border border-dark-3 p-1 text-left">
                            Nature{" "}
                            <span className="text-sm font-normal text-gray">
                                {formatString(createdPokemon.nature)}
                            </span>
                        </h3>
                        <h3 className="border border-dark-3 p-1 text-left">
                            Item{" "}
                            <span className="text-sm font-normal text-gray">
                                {formatString(createdPokemon.heldItem)}
                            </span>
                        </h3>
                    </div>
                    <div className="hidden flex-col md:flex">
                        <h3 className="w-full border border-dark-3 p-1">
                            Moves
                        </h3>
                        <div className="flex h-full w-full flex-col justify-between border border-dark-3 p-1">
                            {createdPokemon.moves.map((move) => {
                                return (
                                    <div
                                        key={move.move}
                                        className="flex w-full items-center justify-center"
                                    >
                                        <p className="truncate">
                                            {formatString(move.move)}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid md:hidden">
                <h3 className="border border-dark-3 p-1">Moves</h3>
                <div className="grid grid-cols-2 border border-dark-3">
                    {createdPokemon.moves.map((move) => {
                        return (
                            <div
                                key={move.move}
                                className="flex w-full items-center justify-center p-1"
                            >
                                <p className="truncate">
                                    {formatString(move.move)}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="grid border border-dark-3 md:grid-cols-2">
                <div className="grid grid-cols-6 md:hidden">
                    {STATS.sort().map((stat) => (
                        <h4 key={stat}>{stat}</h4>
                    ))}
                </div>
                <div className="p-1">
                    <h3>EVs</h3>
                    <div className="grid grid-cols-6">
                        {createdPokemon.evs.map((ev) => {
                            return (
                                <div key={`${ev.stat}EV`}>
                                    <h4 className="hidden md:block">
                                        {ev.stat}
                                    </h4>
                                    <p>{ev.value}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="p-1">
                    <h3>IVs</h3>
                    <div className="grid grid-cols-6">
                        {createdPokemon.ivs.map((iv) => {
                            return (
                                <div key={`${iv.stat}IV`}>
                                    <h4 className="hidden md:block">
                                        {iv.stat}
                                    </h4>
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
