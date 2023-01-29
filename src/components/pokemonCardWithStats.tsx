import { type inferProcedureOutput } from "@trpc/server"
import { useSession } from "next-auth/react"
import { type AppRouter } from "../server/api/root"
import { api } from "../utils/api"
import formatString from "../utils/formatString"
import { LoadingSpinner } from "./ui/loadingSpinner"

type createdPokemon = inferProcedureOutput<
    AppRouter["pokemon"]["getSinglePokemon"]
>

interface Props {
    pokemonName: string
    createdPokemon: createdPokemon
}

const formatStat = (statName: string) => {
    const stat = statName.toLowerCase()
    if (stat === "attack") return "Att"
    if (stat === "defense") return "Def"
    if (stat === "speed") return "Spe"
    if (stat === "hitpoints") return "Hp"
    if (stat === "special attack") return "Spa"
    if (stat === "special defense") return "Spd"
}

export default function PokemonCardWithStats({
    pokemonName,
    createdPokemon,
}: Props) {
    const { data: session } = useSession()
    const apiContext = api.useContext()

    const [favorited, pokemonData] = api.useQueries((q) => {
        return [
            q.favorite.checkFavorite({
                userId: session?.user?.id as string,
                pokemonId: createdPokemon!.id,
            }),
            q.pokeApi.getPokemonByName({
                name: pokemonName,
            }),
        ]
    })

    const favorite = favorited.data
    const pokemon = pokemonData.data
    const isLoading = favorited.isLoading || pokemonData.isLoading

    const addFavorite = api.favorite.favoritePokemon.useMutation({
        onMutate: async () => {
            const userFavorites =
                apiContext.favorite.getUserFavoritePokemon.getData({
                    userId: session?.user?.id as string,
                })

            apiContext.favorite.checkFavorite.setData(
                { userId: session!.user!.id, pokemonId: createdPokemon!.id },
                true
            )

            if (userFavorites) {
                apiContext.favorite.getUserFavoritePokemon.setData(
                    { userId: session!.user!.id },
                    [...userFavorites, createdPokemon!.id]
                )
            }

            return { userFavorites }
        },
        onError: (error, variables, context) => {
            apiContext.favorite.checkFavorite.setData(
                { userId: session!.user!.id, pokemonId: createdPokemon!.id },
                false
            )
            apiContext.favorite.getUserFavoritePokemon.setData(
                { userId: session!.user!.id },
                context?.userFavorites
            )
        },
        onSettled: () => {
            apiContext.favorite.checkFavorite.invalidate()
            apiContext.favorite.getUserFavoritePokemon.invalidate()
        },
    })
    const removeFavorite = api.favorite.unfavoritePokemon.useMutation({
        onMutate: async () => {
            const userFavorites =
                apiContext.favorite.getUserFavoritePokemon.getData({
                    userId: session?.user?.id as string,
                })
            apiContext.favorite.checkFavorite.setData(
                { userId: session!.user!.id, pokemonId: createdPokemon!.id },
                false
            )

            if (userFavorites) {
                apiContext.favorite.getUserFavoritePokemon.setData(
                    { userId: session!.user!.id },
                    userFavorites.filter((fav) => fav !== createdPokemon?.id)
                )
            }

            return { userFavorites }
        },
        onError: (error, variables, context) => {
            apiContext.favorite.checkFavorite.setData(
                { userId: session!.user!.id, pokemonId: createdPokemon!.id },
                true
            )
            apiContext.favorite.getUserFavoritePokemon.setData(
                { userId: session!.user!.id },
                context?.userFavorites
            )
        },
        onSettled: () => {
            apiContext.favorite.checkFavorite.invalidate()
            apiContext.favorite.getUserFavoritePokemon.invalidate()
        },
    })

    const handleFavorite = () => {
        favorite
            ? removeFavorite.mutate({
                  pokemonId: createdPokemon!.id,
                  userId: session!.user!.id,
              })
            : addFavorite.mutate({
                  pokemonId: createdPokemon!.id,
                  userId: session!.user!.id,
              })
    }

    if (isLoading) return <LoadingSpinner />

    const pokemonImage = createdPokemon?.shiny
        ? pokemon?.sprites.front_shiny
        : pokemon?.sprites.front_default
    return (
        <div className="flex aspect-[4/5] flex-col justify-between p-4 text-center">
            <h2>{formatString(createdPokemon!.name)}</h2>
            <div className="h-fit justify-between lg:flex">
                <div className="relative my-auto aspect-square w-full">
                    {pokemonImage && (
                        <img
                            src={pokemonImage}
                            className="aspect-square w-full"
                        />
                    )}
                    <button
                        className=" absolute top-0 right-0 rounded-full"
                        onClick={handleFavorite}
                    >
                        <div
                            className={`h-10 w-10 rounded-full ${
                                favorite ? "bg-lime-400" : "bg-slate-500"
                            }`}
                        ></div>
                    </button>
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
                        <p>ter type</p>
                    </div>
                    <div>
                        <h2>Ability</h2>
                        <p>{formatString(createdPokemon!.ability)}</p>
                    </div>
                    <div>
                        <h2>Nature</h2>
                        <p>{formatString(createdPokemon!.nature)}</p>
                    </div>
                    <div>
                        <h2>Held Item</h2>
                        <p>{formatString(createdPokemon!.heldItem)}</p>
                    </div>
                    <div className="mx-auto w-fit">
                        <h2>Moves</h2>
                        <div className="grid grid-cols-2 gap-1 lg:grid-cols-1">
                            {createdPokemon?.moves.map((move) => {
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
                        {createdPokemon?.evs.map((ev) => {
                            return (
                                <div>
                                    <h3>{formatStat(ev.stat)}</h3>
                                    <p>{ev.value}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2>IVs</h2>
                    <div className="grid grid-cols-3">
                        {createdPokemon?.ivs.map((iv) => {
                            return (
                                <div>
                                    <h3>{formatStat(iv.stat)}</h3>
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
