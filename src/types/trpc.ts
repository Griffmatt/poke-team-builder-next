import { type inferProcedureOutput } from "@trpc/server"
import { type formatTeams } from "server/utils/formatTeams"
import { type AppRouter } from "../server/api/root"

type CreatedPokemon = NonNullable<
    inferProcedureOutput<AppRouter["pokemon"]["getSinglePokemon"]>
>

type teams = inferProcedureOutput<AppRouter["teams"]["getTeams"]>

type team = inferProcedureOutput<AppRouter["teams"]["getTeam"]>

type user = {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
}

type formattedTeam = ReturnType<typeof formatTeams>

export type { CreatedPokemon, teams, team, user, formattedTeam }
