import { CommonData } from "components/commonData/commonData"
import { CommonMoves } from "components/commonData/commonMoves"
import { BackButton } from "components/ui/backButton"
import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { api } from "utils/api"
import { formatStat } from "utils/formatStat"
import { formatString } from "utils/formatString"
import { PokemonDataGrid } from "components/pokemonGrids/pokemonDataGrid"
import { PokemonImage } from "components/pokemonGrids/cards/pokemonImage"

const SinglePokemon: NextPage = () => {
    const router = useRouter()
    const { pokemonName } = router.query
    const { data: session } = useSession()

    const { data: pokemon } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName as string,
    })

    const { data: pokemonBuilds } = api.pokemon.getPokemonBuilds.useQuery({
        pokemonName: pokemonName as string,
    })

    const { data: teammates } = api.mostCommon.teamMates.useQuery({
        pokemonName: pokemonName as string,
    })

    const { data: moves } = api.mostCommon.moves.useQuery({
        pokemonName: pokemonName as string,
    })

    let totalStats = 0

    if (pokemon == null || pokemonBuilds == null) {
        const fillerArr = Array.from({ length: 6 }, () => 0)
        return (
            <main>
                <BackButton />
                <div className="h-8 w-32 animate-pulse bg-dark-2" />
                <div className="grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-3">
                    <div className="h-fit w-full xl:row-span-2">
                        <div className="flex h-full flex-col justify-around p-3">
                            <div className="aspect-square animate-pulse rounded-full bg-dark-3" />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="h-6 w-32 animate-pulse bg-dark-2" />
                        <div>
                            {fillerArr.map((_, index) => {
                                return (
                                    <div key={index}>
                                        <div className="h-6" />
                                        <div className="h-6 animate-pulse rounded-full bg-dark-2" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main>
            <BackButton />
            <h1>{formatString(pokemon.name)}</h1>
            <div className="grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-3">
                <div className="h-fit w-full xl:row-span-2">
                    <PokemonImage pokemon={pokemon} />
                </div>
                <div className="lg:col-span-2">
                    <h2>Stats</h2>
                    <div>
                        {pokemon.stats.map((stat) => {
                            const maxNumber = 150
                            const limitNumber = Math.min(
                                stat.base_stat,
                                maxNumber
                            )

                            const percentage = Math.trunc(
                                (limitNumber / maxNumber) * 100
                            )
                            totalStats += stat.base_stat
                            const bgColor = formatStat(stat.stat.name)
                            return (
                                <div key={stat.stat.name}>
                                    <h3>
                                        {formatString(stat.stat.name)}:{" "}
                                        {stat.base_stat}
                                    </h3>
                                    <div className="h-6 rounded-full bg-dark-2">
                                        <div
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                            className={`${bgColor} h-6 rounded-full`}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h3>Total Stats: {totalStats}</h3>
                </div>
                {pokemonBuilds.length > 0 && (
                    <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
                        <h2>Data</h2>
                        <div>
                            <h3>Common Teammates</h3>
                            <PokemonDataGrid
                                pokemonData={teammates ?? null}
                                amount={6}
                            />
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                            <CommonData
                                pokemonBuilds={pokemonBuilds}
                                dataType="nature"
                            />
                            <CommonData
                                pokemonBuilds={pokemonBuilds}
                                dataType="ability"
                            />
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                            <CommonData
                                pokemonBuilds={pokemonBuilds}
                                dataType="teraType"
                            />
                            <CommonData
                                pokemonBuilds={pokemonBuilds}
                                dataType="heldItem"
                            />
                        </div>
                        {moves && <CommonMoves moves={moves} />}
                    </div>
                )}
                <div
                    className={`grid gap-3 ${
                        session?.user?.id && pokemonBuilds.length > 0
                            ? "md:col-span-2 md:grid-cols-2 lg:col-start-2"
                            : "md:col-start-2 lg:col-start-3"
                    }`}
                >
                    {pokemonBuilds.length > 0 && (
                        <Link
                            href={`/build/pokemon/${pokemon?.name}/builds`}
                            className="grid h-fit w-full place-items-center rounded-2xl px-4 py-2 text-center dark:bg-dark-3"
                        >
                            <h4>See Builds</h4>
                        </Link>
                    )}
                    {session?.user?.id && (
                        <Link
                            href={`/build/pokemon/${pokemon?.name}/create`}
                            className="grid h-fit w-full  place-items-center rounded-2xl px-4 py-2 text-center dark:bg-dark-3"
                        >
                            <h4>Build Pokemon</h4>
                        </Link>
                    )}
                </div>
            </div>
        </main>
    )
}

export default SinglePokemon
