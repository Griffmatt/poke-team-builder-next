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
        <div className="col-span-full flex flex-col justify-end gap-3 sm:flex-row">
            {hasBuilds && (
                <Link
                    href={`/build/pokemon/${pokemonName}/builds`}
                    className="w-full rounded-2xl bg-dark-3 px-4 py-2 text-center lg:w-[33%]"
                >
                    <h3>See Builds</h3>
                </Link>
            )}
            {session?.user?.id && (
                <Link
                    href={`/build/pokemon/${pokemonName}/build`}
                    className="w-full rounded-2xl bg-dark-3 px-4 py-2 text-center lg:w-[33%]"
                >
                    <h3>Build Pokemon</h3>
                </Link>
            )}
        </div>
    )
}
