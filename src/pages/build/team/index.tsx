import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { BuildNav } from "../../../components/build/buildNav"
import { PokemonCard } from "../../../components/pokemonCard"
import { PokemonEmpty } from "../../../components/pokemonEmpty"
import { useBuildTeam } from "../../../hooks/useBuildTeam"
import { api } from "../../../utils/api"

const BuildTeam: NextPage = () => {
    const { data: session } = useSession()
    const { data: pokemons } = api.pokemon.getUsersPokemon.useQuery({
        userId: session?.user?.id as string,
    })
    const [query, setQuery] = useState("")

    let timer: NodeJS.Timeout | undefined
    const debounceQuery = (queryValue: string) => {
        clearTimeout(timer)
        timer = setTimeout(() => setQuery(queryValue), 1000)
    }

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
            <div className="flex justify-between">
                <h1>Build Team</h1>
                <input
                    placeholder="Search for a pokemon..."
                    type="text"
                    onChange={(event) =>
                        debounceQuery(event.target.value.toLowerCase())
                    }
                    className="w-60 rounded-2xl px-4 py-2 text-black outline-none"
                />
            </div>
            <BuildNav selected="team" />
            <div className="grid gap-3">
                <div className="pokemon-card-grid">
                    {pokemonOnTeam.length === 0 ? (
                        <div className="aspect-[4/5] w-full"></div>
                    ) : (
                        pokemonOnTeam?.map((pokemon) => {
                            return (
                                <button
                                    key={pokemon?.id}
                                    className="pokemon-card"
                                    onClick={() =>
                                        removePokemonFromTeam(pokemon!.id)
                                    }
                                >
                                    <PokemonCard
                                        pokemonName={pokemon!.name}
                                        createdPokemon={pokemon}
                                    />
                                </button>
                            )
                        })
                    )}
                </div>
                <button className="rounded-2xl p-3" onClick={buildTeam}>
                    Build Team
                </button>
            </div>
            {filteredPokemon?.length === 0 ? (
                <PokemonEmpty query={query} />
            ) : (
                <div className="pokemon-card-grid">
                    {filteredPokemon?.map((pokemon) => {
                        const favorited =
                            pokemon.favorited[0]?.userId === pokemon.userId
                        return (
                            <button
                                className="pokemon-card"
                                onClick={() => addPokemonToTeam(pokemon)}
                                key={pokemon.id}
                            >
                                <PokemonCard
                                    pokemonName={pokemon.name}
                                    createdPokemon={pokemon}
                                    favorite={favorited}
                                />
                            </button>
                        )
                    })}
                </div>
            )}
        </main>
    )
}

export default BuildTeam
