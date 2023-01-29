import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "../../../utils/api"
import PokemonCardWithStats from "../../../components/pokemonCardWithStats"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

const SinglePokemon: NextPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const { userId, pokemonId } = router.query

    const { data: pokemon } = api.pokemon.getSinglePokemon.useQuery({
        pokemonId: pokemonId as string,
    })
    const { data: user } = api.users.getUser.useQuery({
        userId: userId as string,
    })

    const [modalOpen, setModalOpen] = useState(false)

    return (
        <main>
            <button
                className="w-fit rounded-2xl px-4 py-2"
                onClick={() => router.back()}
            >
                Back
            </button>
            {pokemon && user && (
                <>
                    <h2>
                        {user?.name}'s {pokemon?.name}
                    </h2>
                    <div className="mx-auto grid gap-3 md:w-[25vw]">
                        <div className="pokemon-card">
                            <PokemonCardWithStats
                                pokemonName={pokemon.name}
                                createdPokemon={pokemon}
                            />
                        </div>

                        <div className="flex justify-between">
                            {session?.user?.id === user?.id ? (
                                <>
                                    <button className="btn-red w-fit rounded-2xl py-2 px-4" onClick={() => setModalOpen(true)}>
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
                            ) : (
                                <button className="ml-auto w-fit rounded-2xl py-2 px-4">
                                    Copy
                                </button>
                            )}
                        </div>
                    </div>
                    {modalOpen && <div></div>}
                </>
            )}
        </main>
    )
}

export default SinglePokemon
