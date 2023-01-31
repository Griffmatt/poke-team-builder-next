import { teams } from "./types"

export const formatTeams = (teamArr: teams) =>{
    return teamArr.map(team => {
    return {
        id: team.id,
        userId: team.userId,
        originalTrainerId: team.originalTrainerId,
        teamStyle: team.teamStyle,
        teamName: team.teamName,
        createdAt: team.createdAt,
        pokemon: team.pokemon.map(({ createdPokemon }) => {
            return {
                id: createdPokemon.id,
                userId: createdPokemon.userId,
                name: createdPokemon.name,
                ability: createdPokemon.ability,
                nature: createdPokemon.nature,
                heldItem: createdPokemon.heldItem,
                teraType: createdPokemon.teraType,
                shiny: createdPokemon.shiny,
                createdAt: createdPokemon.createdAt,
                moves: createdPokemon.moves,
                evs: createdPokemon.evs,
                ivs: createdPokemon.ivs,
                teams: createdPokemon.teams,
                favorited: createdPokemon.favorited
            }
        }),
    }})
}
