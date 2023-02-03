import { inferProcedureOutput } from "@trpc/server"
import { AppRouter } from "../server/api/root"

type CreatedPokemon = inferProcedureOutput<
    AppRouter["pokemon"]["getSinglePokemon"]
>

type teams = inferProcedureOutput<AppRouter["teams"]["getTeams"]>

type team = inferProcedureOutput<AppRouter["teams"]["getTeam"]>

type user = inferProcedureOutput<AppRouter["users"]["getUser"]>

export type { CreatedPokemon, teams, team, user }
