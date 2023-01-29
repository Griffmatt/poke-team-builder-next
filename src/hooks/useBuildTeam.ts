import { useRouter } from "next/router"
import { useState } from "react"
import type { inferProcedureOutput } from "@trpc/server"
import { type AppRouter } from "../server/api/root"
import { api } from "../utils/api"

type createdPokemon = inferProcedureOutput<
    AppRouter["pokemon"]["getSinglePokemon"]
>

export function useBuildTeam(userId: string) {
    const router = useRouter()
    const [pokemonOnTeam, setPokemonOnTeam] = useState<createdPokemon[]>([])
    const [teamName, setTeamName] = useState("Team Name")
    const [teamStyle] = useState("Double")

    const apiContext = api.useContext()

    const buildTeamMutation = api.teams.buildTeam.useMutation({
        onMutate: async (variables) => {
            const pastTeams = apiContext.teams.getUserTeams.getData({
                userId: userId,
            })

            const formatPokemon = pokemonOnTeam.map((pokemon) => {
                return {
                    id: pokemon?.id as string,
                    userId: pokemon?.userId as string,
                    name: pokemon?.name as string,
                    ability: pokemon?.ability as string,
                    nature: pokemon?.nature as string,
                    heldItem: pokemon?.heldItem as string,
                    shiny: pokemon?.shiny as boolean,
                    createdAt: pokemon?.createdAt as Date,
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
                        pokemon: formatPokemon
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

    const addPokemonToTeam = (pokemon: createdPokemon) => {
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
            pokemon: {
                createMany: {
                    data: pokemonIds,
                },
            },
        })

        return null
    }

    return {
        addPokemonToTeam,
        removePokemonFromTeam,
        buildTeam,
        pokemonOnTeam,
        setPokemonOnTeam,
        teamName,
        setTeamName,
    }
}
