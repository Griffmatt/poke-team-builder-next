import { teams } from "./includeConfigs"

export const formatTeams = (teamArr: teams) => {
    return teamArr.map((team) => {
        return {
            id: team.id,
            userId: team.userId,
            originalTrainerId: team.originalTrainerId,
            teamStyle: team.teamStyle,
            teamName: team.teamName,
            wins: team.wins,
            battles: team.battles,
            createdAt: team.createdAt,
            favorited: team.favorited,
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
                    favorited: createdPokemon.favorited,
                }
            }),
        }
    })
}
