import { useState } from "react"
import { type CreatedPokemon } from "types/trpc"
import { buildTeamMutation } from "mutations/buildTeamMutation"

export function useBuildTeam(userId: string) {
    const [pokemonOnTeam, setPokemonOnTeam] = useState<CreatedPokemon[]>([])
    const [teamName, setTeamName] = useState("Team Name")
    const [teamStyle, setTeamStyle] = useState<"Double" | "Single">("Double")

    const formatPokemon = pokemonOnTeam.map((pokemon) => {
        return {
            id: pokemon.id,
            userId: pokemon.userId,
            name: pokemon.name,
            ability: pokemon.ability,
            nature: pokemon.nature,
            heldItem: pokemon.heldItem,
            shiny: pokemon.shiny,
            teraType: pokemon.teraType,
            createdAt: pokemon.createdAt,
            moves: pokemon.moves,
            ivs: pokemon.ivs,
            evs: pokemon.evs,
            teams: pokemon.teams,
            favorited: pokemon.favorited,
        }
    })

    const addTeam = buildTeamMutation(userId, {
        id: "idPlaceHolder",
        userId: userId,
        originalTrainerId: null,
        teamStyle: teamStyle,
        teamName: teamName,
        wins: 0,
        battles: 0,
        favorited: [],
        createdAt: new Date(),
        pokemon: formatPokemon,
    })

    const addPokemonToTeam = (pokemon: CreatedPokemon | null) => {
        if (pokemon === null) return null
        if (pokemonOnTeam.length >= 6) return null
        const containsPokemon = pokemonOnTeam.find(
            (pokemonOnTeam) => pokemonOnTeam?.id === pokemon?.id
        )

        if (containsPokemon) return null

        setPokemonOnTeam([...pokemonOnTeam, pokemon])
        return null
    }

    const removePokemonFromTeam = (id: string) => {
        const filterOutPokemon = pokemonOnTeam.filter(
            (pokemon) => pokemon?.id !== id
        )

        setPokemonOnTeam(filterOutPokemon)
    }

    const buildTeam = () => {
        if (pokemonOnTeam.length < 6) return null

        if (userId == null || pokemonOnTeam == null) return null

        const pokemonIds = pokemonOnTeam.map((pokemon) => {
            return { pokemonId: pokemon.id }
        })
        addTeam.mutate({
            teamName: teamName,
            teamStyle: teamStyle,
            originalTrainerId: null,
            pokemon: pokemonIds,
        })

        return null
    }

    const handleNameChange = (value: string) => {
        if (value.length >= 16) return null
        setTeamName(value)
    }

    return {
        addPokemonToTeam,
        removePokemonFromTeam,
        buildTeam,
        pokemonOnTeam,
        setPokemonOnTeam,
        teamName,
        teamStyle,
        setTeamStyle,
        handleNameChange,
    }
}
