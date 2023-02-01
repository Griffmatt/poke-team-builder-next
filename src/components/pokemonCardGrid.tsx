import React from "react"
import { CreatedPokemon } from "../types/trpc"
import { api } from "../utils/api"
import { PokemonCard } from "./pokemonCard"

interface pokemonArr {
    pokemonArr: CreatedPokemon[]
    totalPokemon?: never
    linkTo: "build" | "stats" | null
    userId?: string
}

interface totalPokemon {
    pokemonArr?: never
    totalPokemon: {
        total: number
        pokemon: { name: string; amount: number }[]
        pokemonName?: string
    }
    linkTo: "build" | "stats" | null
    userId?: string
}

type Props = pokemonArr | totalPokemon

const PokemonCardGrid = ({
    pokemonArr,
    totalPokemon,
    linkTo,
    userId,
}: Props) => {
    const { data: favorites } = api.favorite.getUserFavoritePokemon.useQuery({
        userId: userId as string,
    })
    return (
        <div className="pokemon-card-grid">
            {pokemonArr
                ? pokemonArr?.map((pokemon) => {
                      if (pokemon === null) return null
                      const favorite = favorites?.includes(pokemon.id)
                      return (
                          <React.Fragment key={pokemon.id}>
                              <PokemonCard
                                  pokemonName={pokemon.name}
                                  linkTo={linkTo}
                                  createdPokemon={pokemon}
                                  favorite={favorite}
                              />
                          </React.Fragment>
                      )
                  })
                : totalPokemon?.pokemon.map((pokemon) => {
                      if (pokemon === null) return null
                      const { format: formatPercentage } = Intl.NumberFormat(
                          "en-US",
                          {
                              style: "percent",
                              minimumFractionDigits: 2,
                          }
                      )
                      const percentage = formatPercentage(
                          pokemon.amount / totalPokemon.total
                      )
                      return (
                          <React.Fragment key={pokemon.name}>
                              <PokemonCard
                                  pokemonName={pokemon.name}
                                  linkTo={linkTo}
                                  percentage={percentage}
                              />
                          </React.Fragment>
                      )
                  })}
        </div>
    )
}

export { PokemonCardGrid }
