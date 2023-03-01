import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect } from "react"
import { useSelectedContext } from "context/selectedContext"
import { api } from "utils/api"

interface Props {
    pokemonName: string
}

export const BuildButtons = ({ pokemonName }: Props) => {
    const { data: session } = useSession()
    const { resetData } = useSelectedContext()

    const { data: hasBuilds } = api.pokemon.hasBuilds.useQuery({
        pokemonName: pokemonName,
    })

    useEffect(() => {
        if (hasBuilds === false) {
            resetData()
        }
    }, [hasBuilds, resetData])
    return (
        <div
            className={`grid gap-3 ${
                hasBuilds
                    ? "xs:col-span-2 xs:grid-cols-2 lg:col-start-2"
                    : "xs:col-start-2 lg:col-start-3"
            }`}
        >
            {hasBuilds && (
                <Link
                    href={`/build/pokemon/${pokemonName}/builds`}
                    className="grid h-fit w-full place-items-center rounded-2xl bg-dark-3 px-4 py-2 text-center"
                >
                    <h3>See Builds</h3>
                </Link>
            )}
            {session?.user?.id && (
                <Link
                    href={`/build/pokemon/${pokemonName}/build`}
                    className="grid h-fit w-full  place-items-center rounded-2xl bg-dark-3 px-4 py-2 text-center"
                >
                    <h3>Build Pokemon</h3>
                </Link>
            )}
        </div>
    )
}
