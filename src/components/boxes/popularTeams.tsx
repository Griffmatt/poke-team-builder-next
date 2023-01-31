import Link from "next/link"
import React from "react"
import { api } from "../../utils/api"
import { PokemonCard } from "../pokemonCard"

const PopularTeams = () => {
    const { data: popularTeams } = api.statistics.getPopularTeams.useQuery()
    return (
        <div className="grid gap-3">
            <h2>Popular Teams</h2>
            {popularTeams?.map((team) => {
                return (
                    <React.Fragment key={team.id}>
                        <h3>{team.teamName}</h3>
                        <Link
                            href={`/team/${team.id}`}
                            className="pokemon-card-grid"
                        >
                            {team.pokemon.map((pokemon) => {
                                return (
                                    <div
                                        className="pokemon-card"
                                        key={pokemon.id}
                                    >
                                        <PokemonCard
                                            pokemonName={pokemon.name}
                                            createdPokemon={pokemon}
                                        />
                                    </div>
                                )
                            })}
                        </Link>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export { PopularTeams }
