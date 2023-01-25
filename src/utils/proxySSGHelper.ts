import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '../server/api/root'
import { createInnerTRPCContext } from '../server/api/trpc'
import superjson from 'superjson'

export const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext(),
    transformer: superjson,
})
