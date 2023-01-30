import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "../../../utils/api"
import { PokemonCardWithStats } from "../../../components/pokemonCardWithStats"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import DeleteModal from "../../../components/deleteModal"

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
    const { data: favorites } = api.favorite.getUserFavoritePokemon.useQuery({
        userId: session?.user?.id as string,
    })

    const [showModal, setShowModal] = useState(false)

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
                    <div className="mx-auto grid w-[80%] gap-3 md:w-[50%] lg:w-[40%]">
                        <div className="pokemon-card">
                            <PokemonCardWithStats
                                pokemonName={pokemon.name}
                                createdPokemon={pokemon}
                                favorite={favorites?.includes(pokemon.id)}
                            />
                        </div>

                        <div className="flex justify-between">
                            {session?.user?.id === user?.id ? (
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
                            ) : (
                                <button className="ml-auto w-fit rounded-2xl py-2 px-4">
                                    Copy
                                </button>
                            )}
                        </div>
                    </div>
                    {showModal && (
                        <DeleteModal
                            userId={userId as string}
                            name={pokemon.name}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            pokemonId={pokemonId as string}
                        />
                    )}
                </>
            )}
        </main>
    )
}

export default SinglePokemon
