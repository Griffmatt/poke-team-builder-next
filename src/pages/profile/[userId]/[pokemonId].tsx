import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "utils/api"
import { PokemonCardWithStats } from "components/pokemonCards/pokemonCardWithStats"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { DeleteModal } from "components/modals/deleteModal"
import { firstNameOnly } from "utils/firstNameOnly"
import { LoadingCardWithStats } from "components/pokemonCards/ui/loadingCardWithStats"
import { formatString } from "utils/formatString"

const SinglePokemon: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const { userId, pokemonId } = router.query

    const [showModal, setShowModal] = useState(false)

    const {
        data: pokemon,
        isLoading,
        error,
    } = api.pokemon.getSinglePokemon.useQuery({
        pokemonId: pokemonId as string,
    })
    const {
        data: user,
        isLoading: isLoading2,
        error: error2,
    } = api.users.getUser.useQuery({
        userId: userId as string,
    })
    const {
        data: favorites,
        isLoading: isLoading3,
        error: error3,
        isFetching,
    } = api.favorite.checkUserFavoritePokemon.useQuery(
        {
            userId: session?.user?.id as string,
        },
        {
            enabled: !!session?.user?.id,
        }
    )

    if (isLoading || isLoading2 || (isLoading3 && isFetching)) {
        return (
            <main aria-label="Loading">
                <h1 className="h-8 w-32 animate-pulse bg-dark-2" />
                <div className="mx-auto grid w-full max-w-xl gap-3">
                    <LoadingCardWithStats />
                </div>
            </main>
        )
    }

    if (error) return <div>Error: {error.message}</div>
    if (error2) return <div>Error: {error2.message}</div>
    if (error3) return <div>Error: {error3.message}</div>

    if (pokemon === null) return <div>Pokemon not found!</div>
    if (user === null) return <div>User not found!</div>

    const pokemonTeams = pokemon?.teams.map((team) => team.teamId)

    return (
        <main>
            <h1 className="truncate">
                <Link href={`/profile/${user.id}`}>
                    {user.name && `${firstNameOnly(user.name)}'s`}
                </Link>{" "}
                {formatString(pokemon.name)}
            </h1>
            <div className="mx-auto grid w-full max-w-xl gap-3">
                <PokemonCardWithStats
                    createdPokemon={pokemon}
                    favorite={favorites?.includes(pokemon.id) ?? false}
                />
                {session?.user !== undefined && (
                    <div className="flex justify-between">
                        {session?.user?.id === userId && (
                            <>
                                <button
                                    className="btn-red w-fit rounded-2xl py-2 px-4"
                                    onClick={() => setShowModal(true)}
                                >
                                    Delete
                                </button>
                                <Link
                                    href={`/build/pokemon/${pokemon.name}/${pokemon.id}/update`}
                                >
                                    <button className="w-fit rounded-2xl py-2 px-4">
                                        Update
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
            {showModal && (
                <DeleteModal
                    userId={userId as string}
                    name={pokemon.name}
                    setShowModal={setShowModal}
                    pokemonId={pokemonId as string}
                    pokemonTeams={pokemonTeams}
                />
            )}
        </main>
    )
}

export default SinglePokemon
