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

    const buildTeamMutation = api.teams.buildTeam.useMutation({
      onSuccess: () => {
        router.push("/build/pokemon")
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
        await buildTeamMutation.mutate({
            userId: userId,
            teamName: teamName,
            teamStyle: "double",
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
        teamName,
        setTeamName,
    }
}
