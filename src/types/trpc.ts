import { inferProcedureOutput } from "@trpc/server"
import { formatTeams } from "server/utils/formatTeams"
import { AppRouter } from "../server/api/root"

type CreatedPokemon = NonNullable<
    inferProcedureOutput<AppRouter["pokemon"]["getSinglePokemon"]>
>

type teams = NonNullable<inferProcedureOutput<AppRouter["teams"]["getTeams"]>>

type team = NonNullable<inferProcedureOutput<AppRouter["teams"]["getTeam"]>>

type user = NonNullable<inferProcedureOutput<AppRouter["users"]["getUser"]>>

type formattedTeam = ReturnType<typeof formatTeams>

export type { CreatedPokemon, teams, team, user, formattedTeam }
