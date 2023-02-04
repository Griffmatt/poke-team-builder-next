import { CommonData } from "components/commonData/commonData"
import { CommonMoves } from "components/commonData/commonMoves"
import { CommonTeammates } from "components/commonData/commonTeammates"
import { PokemonCard } from "components/pokemonCard"
import { BackButton } from "components/ui/backButton"
import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { api } from "utils/api"
import { formatStat } from "utils/formatStat"
import formatString from "utils/formatString"

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

    let totalStats = 0

    return (
        <main>
            <BackButton />
            <h1>PokeDex Entry</h1>
            {pokemon && (
                <div className="grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-3">
                    <div className="h-fit w-full xl:row-span-2">
                        <PokemonCard pokemonName={pokemon.name} />
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
                            <h3>Total Stats: {totalStats}</h3>
                        </div>
                    </div>
                    {pokemonBuilds && (
                        <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
                            <h2>Data</h2>
                            <CommonTeammates pokemonName={pokemonName as string} />
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
                            <CommonMoves pokemonName={pokemon.name} />
                        </div>
                    )}
                    <div
                        className={`grid gap-3 ${
                            session?.user?.id
                                ? "md:col-span-2 md:grid-cols-2 lg:col-start-2"
                                : "md:col-start-2 lg:col-start-3"
                        }`}
                    >
                        <Link
                            href={`/build/pokemon/${pokemon?.name}/builds`}
                            className="w-full rounded-2xl px-4 py-2 text-center dark:bg-dark-3"
                        >
                            See Builds
                        </Link>
                        {session?.user?.id && (
                            <Link
                                href={`/build/pokemon/${pokemon?.name}/create`}
                                className="w-full rounded-2xl px-4 py-2 text-center dark:bg-dark-3"
                            >
                                Build Pokemon
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </main>
    )
}

export default SinglePokemon
