import { CreatedPokemonFavorited } from "../types/trpc";



const sortUserpokemonGrid = (pokemon: CreatedPokemonFavorited[]) => {
    pokemon.sort((a, b) => {
        return (a.favorited === b.favorited)? 0 : a? -1 : 1;
    })
}