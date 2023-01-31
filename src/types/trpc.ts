import { inferProcedureOutput } from "@trpc/server"
import { AppRouter } from "../server/api/root"

type CreatedPokemon = inferProcedureOutput<
    AppRouter["pokemon"]["getSinglePokemon"]
>

type teams = inferProcedureOutput<AppRouter["teams"]["getTeams"]>

type team = inferProcedureOutput<AppRouter["teams"]["getTeam"]>

export type { CreatedPokemon, teams, team}
