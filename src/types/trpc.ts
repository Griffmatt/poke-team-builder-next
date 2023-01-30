import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../server/api/root";

type CreatedPokemonFavorited = inferProcedureOutput<
    AppRouter["pokemon"]["getSinglePokemon"]
> & { favorited: boolean}

type CreatedPokemon = inferProcedureOutput<
    AppRouter["pokemon"]["getSinglePokemon"]
>

export type { CreatedPokemonFavorited, CreatedPokemon }