import { createTRPCRouter } from './trpc'
import { usersRouter } from './routers/users'
import { pokemonRouter } from './routers/pokemon'
import { pokeApiRouter } from './routers/pokeApi'
import { statisticsRouter } from './routers/statistics'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
    users: usersRouter,
    pokemon: pokemonRouter,
    pokeApi: pokeApiRouter,
    statistics: statisticsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
