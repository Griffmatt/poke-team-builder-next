import { type NextPage } from "next"
import { useRouter } from "next/router"

import { api } from "utils/api"
import { PokemonCardWithStats } from "components/pokemonCardWithStats"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { DeleteModal } from "components/modals/deleteModal"
import { BackButton } from "components/ui/backButton"

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
    const { data: favorites } = api.favorite.checkUserFavoritePokemon.useQuery({
        userId: session?.user?.id as string,
    })

    const [showModal, setShowModal] = useState(false)

    const pokemonTeams = pokemon?.teams.map((team) => team.teamId)

    return (
        <main>
            <BackButton />
            {pokemon && user && (
                <>
                    <h1>
                        {user?.name}'s {pokemon?.name}
                    </h1>
                    <div className="mx-auto grid w-[80%] gap-3 md:w-[50%] lg:w-[40%]">
                        <div className="pokemon-card">
                            <PokemonCardWithStats
                                createdPokemon={pokemon}
                                favorite={
                                    favorites?.includes(pokemon.id) ?? false
                                }
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
                            pokemonTeams={pokemonTeams}
                        />
                    )}
                </>
            )}
        </main>
    )
}

export default SinglePokemon
