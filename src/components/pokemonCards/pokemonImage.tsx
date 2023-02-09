import { Pokemon } from "pokenode-ts"

interface Props {
    pokemon: Pokemon
    shiny?: boolean
}

// Don't wrap with class so that there is skeleton of card when loading data

export const PokemonImage = ({ pokemon, shiny }: Props) => {
    const pokemonImage = shiny
        ? pokemon.sprites.front_shiny
        : pokemon.sprites.front_default

    const pokemonTypes = pokemon.types.map((type, index) => {
        if (index === 1) {
            return `${type.type.name}Secondary`
        }
        return type.type.name
    })

    return (
        <div className="flex h-full flex-col justify-around p-3">
            <div
                className={`aspect-square rounded-full border-8 bg-dark-3 ${pokemonTypes[0]} ${pokemonTypes[1]}`}
            >
                {pokemonImage && <img src={pokemonImage} className="w-full" />}
            </div>
        </div>
    )
}
