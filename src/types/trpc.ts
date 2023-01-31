import { inferProcedureOutput } from "@trpc/server"
import { AppRouter } from "../server/api/root"

type CreatedPokemon = inferProcedureOutput<
    AppRouter["pokemon"]["getSinglePokemon"]
>

export type { CreatedPokemon }
