import { type CreatedPokemon } from "../../types/trpc"

import { api } from "utils/api"
import { formatString } from "utils/formatString"

import { LoadingCard } from "./ui/loadingCard"
import { PokemonImage } from "./pokemonImage"
import { FavoritedButton } from "components/ui/favoritedButton"

interface Props {
    pokemonName: string
    createdPokemon?: CreatedPokemon
    percentage?: string
    favorited?: boolean
}

// Don't wrap with class so that there is skeleton of card when loading data

export const PokemonCard = ({
    pokemonName,
    createdPokemon,
    percentage,
    favorited,
}: Props) => {
    const {
        data: pokemon,
        isLoading,
        error,
    } = api.pokeApi.getPokemonByName.useQuery({
        name: pokemonName,
    })

    //poke api sends invalid JSON at first so add error handling here so the error message doesn't flash in and out
    if (isLoading || error) return <LoadingCard />

    const formatNumber = (number: number) => {
        let formattedNumber = number.toString()

        while (formattedNumber.length < 4) {
            formattedNumber = `0${formattedNumber}`
        }

        return `#${formattedNumber}`
    }
    return (
        <div className="grid gap-1 text-right md:gap-3 lg:gap-5">
            <div className="aspect-square rounded-full bg-dark-3 shadow-md shadow-black">
                <PokemonImage
                    pokemonName={pokemonName}
                    createdPokemon={createdPokemon}
                />
            </div>
            <div className="w-full">
                <h3 className="truncate">{formatString(pokemon.name)}</h3>
                {percentage ? (
                    <p>{percentage}</p>
                ) : (
                    <p>{formatNumber(pokemon.id)}</p>
                )}
            </div>
            {favorited && (
                <FavoritedButton
                    favorited={true}
                    absolute={true}
                    small={true}
                    displayOnly={true}
                />
            )}
        </div>
    )
}
