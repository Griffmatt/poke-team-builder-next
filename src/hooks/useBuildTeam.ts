import { useRouter } from "next/router"
import { useState } from "react"
import { api } from "../utils/api"
import { CreatedPokemon } from "../types/trpc"

export function useBuildTeam(userId: string) {
    const router = useRouter()
    const [pokemonOnTeam, setPokemonOnTeam] = useState<CreatedPokemon[]>([])
    const [teamName, setTeamName] = useState("Team Name")
    const [teamStyle] = useState("Double")

    const apiContext = api.useContext()

    const buildTeamMutation = api.teams.buildTeam.useMutation({
        onMutate: async () => {
            const pastTeams = apiContext.teams.getUserTeams.getData({
                userId: userId,
            })

            const formatPokemon = pokemonOnTeam.map((pokemon) => {
                return {
                    id: pokemon!.id,
                    userId: pokemon!.userId,
                    name: pokemon!.name,
                    ability: pokemon!.ability,
                    nature: pokemon!.nature,
                    heldItem: pokemon!.heldItem,
                    shiny: pokemon!.shiny,
                    teraType: pokemon!.teraType,
                    createdAt: pokemon!.createdAt,
                    moves: pokemon!.moves,
                    ivs: pokemon!.ivs,
                    evs: pokemon!.evs,
                    teams: pokemon!.teams,
                    favorited: pokemon!.favorited,
                }
            })

            if (pastTeams) {
                apiContext.teams.getUserTeams.setData({ userId: userId }, [
                    ...pastTeams,
                    {
                        id: "idPlaceHolder",
                        userId: userId,
                        originalTrainerId: null,
                        teamStyle: teamStyle,
                        teamName: teamName,
                        createdAt: new Date(),
                        pokemon: formatPokemon,
                    },
                ])
            }
            return { pastTeams }
        },
        onSuccess: () => {
            router.push(`/profile/${userId}/teams`)
        },
        onError: (error, variables, context) => {
            if (context?.pastTeams) {
                apiContext.teams.getUserTeams.setData(
                    { userId: userId },
                    context.pastTeams
                )
            }
        },
        onSettled: () => {
            apiContext.teams.getUserTeams.invalidate({ userId: userId })
        },
    })

    const addPokemonToTeam = (pokemon: CreatedPokemon) => {
        if (pokemonOnTeam.length >= 6) return null
        const containsPokemon = pokemonOnTeam.find(
            (pokemonOnTeam) => pokemonOnTeam?.id === pokemon?.id
        )

        if (containsPokemon) return null

        setPokemonOnTeam([...pokemonOnTeam, pokemon])
    }

    const removePokemonFromTeam = (id: string) => {
        const filterOutPokemon = pokemonOnTeam.filter(
            (pokemon) => pokemon?.id !== id
        )

        setPokemonOnTeam(filterOutPokemon)
    }

    const buildTeam = async () => {
        if (pokemonOnTeam.length < 6) return null

        if (userId == null || pokemonOnTeam == null) return null

        const pokemonIds = pokemonOnTeam.map((pokemon) => {
            return { pokemonId: pokemon?.id as string }
        })
        buildTeamMutation.mutate({
            userId: userId,
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
        handleNameChange,
    }
}
