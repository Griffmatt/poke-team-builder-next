import "styles/globals.css"
import "styles/colors.css"

import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { api } from "utils/api"

import { Layout } from "components/ui/layout"
import { useScrollRestoration } from "hooks/useScrollRestoration"
import { SelectedContextProvider } from "context/selectedContext"
import ErrorBoundary from "components/errorBoundary"

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    useScrollRestoration()
    return (
        <SessionProvider session={session}>
            <ErrorBoundary>
                <Layout>
                    <SelectedContextProvider>
                        <Component {...pageProps} />
                    </SelectedContextProvider>
                </Layout>
            </ErrorBoundary>
        </SessionProvider>
    )
}

export default api.withTRPC(MyApp)
