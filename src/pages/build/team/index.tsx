import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { BuildNav } from "../../../components/build/buildNav"
import { PokemonCard } from "../../../components/pokemonCard"
import { useBuildTeam } from "../../../hooks/useBuildTeam"
import { api } from "../../../utils/api"

const Team: NextPage = () => {
    const { data: session } = useSession()
    const { data: pokemons } = api.pokemon.getUsersPokemon.useQuery({
        userId: session?.user?.id as string,
    })

    const {
        addPokemonToTeam,
        removePokemonFromTeam,
        buildTeam,
        pokemonOnTeam,
    } = useBuildTeam(session?.user?.id as string)

    const filteredPokemon = pokemons?.filter(
        (pokemon) =>
            !pokemonOnTeam.some(
                (pokemonFilter) => pokemon.id === pokemonFilter?.id
            )
    )

    return (
        <main>
            <h2>Build Team</h2>
            <BuildNav selected="team" />
            <div className="grid gap-3">
                <div className="pokemon-card-grid">
                    {pokemonOnTeam.length === 0 ? (
                        <div className="aspect-[4/5] w-full"></div>
                    ) : (
                        pokemonOnTeam?.map((pokemon) => {
                            return (
                                <div
                                    key={pokemon?.id}
                                    className="pokemon-card"
                                    onClick={() =>
                                        removePokemonFromTeam(
                                            pokemon?.id as string
                                        )
                                    }
                                >
                                    <PokemonCard
                                        pokemonName={pokemon?.name as string}
                                        createdPokemon={pokemon}
                                    />
                                </div>
                            )
                        })
                    )}
                </div>
                <button className="rounded-2xl p-3" onClick={buildTeam}>
                    Build Team
                </button>
            </div>
            <div className="pokemon-card-grid">
                {filteredPokemon?.map((pokemon) => {
                    return (
                        <button
                            className="pokemon-card"
                            onClick={() => addPokemonToTeam(pokemon)}
                        >
                            <PokemonCard
                                pokemonName={pokemon.name}
                                createdPokemon={pokemon}
                            />
                        </button>
                    )
                })}
            </div>
        </main>
    )
}

export default Team
