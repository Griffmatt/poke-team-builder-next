import { CommonAbilities } from "components/commonData/commonAbilities"
import { CommonHeldItems } from "components/commonData/commonHeldItems"
import { CommonMoves } from "components/commonData/commonMoves"
import { CommonNatures } from "components/commonData/commonNatures"
import { CommonTeammates } from "components/commonData/commonTeammates"
import { CommonTeraTypes } from "components/commonData/commonTeraTypes"
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

    let totalStats = 0

    return (
        <main>
            <BackButton />
            <h1>PokeDex Entry</h1>
            {pokemon && (
                <div className="grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-3">
                    <div className="w-full xl:row-span-2">
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
                    <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
                        <h2>Data</h2>
                        <CommonTeammates pokemonName={pokemon.name} />
                        <div className="grid gap-2 md:grid-cols-2">
                            <CommonNatures pokemonName={pokemon.name} />
                            <CommonAbilities pokemonName={pokemon.name} />
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                            <CommonTeraTypes pokemonName={pokemon.name} />
                            <CommonHeldItems pokemonName={pokemon.name} />
                        </div>
                        <CommonMoves pokemonName={pokemon.name} />
                    </div>
                    {session?.user?.id && (
                        <div className="grid gap-3 md:col-span-2 md:grid-cols-2 lg:col-start-2">
                            <Link
                                href={`/build/pokemon/${pokemon?.name}/create`}
                                className="w-full rounded-2xl px-4 py-2 text-center dark:bg-dark-3"
                            >
                                See Builds
                            </Link>
                            <Link
                                href={`/build/pokemon/${pokemon?.name}/create`}
                                className="w-full rounded-2xl px-4 py-2 text-center dark:bg-dark-3"
                            >
                                Build Pokemon
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}

export default SinglePokemon
