import { type NextPage } from "next"
import { useRouter } from "next/router"
import { formatString } from "utils/formatString"
import { CommonlyUsedData } from "components/build/pokemonInfo/commonlyUsedData"
import { PokemonInfoHead } from "components/build/pokemonInfo/pokemonInfoHead"
import { BuildButtons } from "components/build/pokemonInfo/buildButtons"

const SinglePokemon: NextPage = () => {
    const router = useRouter()
    let { pokemonName } = router.query
    pokemonName = pokemonName as string
    return (
        <main>
            <h1>{formatString(pokemonName)}</h1>
            <section className="grid gap-3 xs:grid-cols-2 lg:grid-cols-3">
                <PokemonInfoHead pokemonName={pokemonName} />
                <CommonlyUsedData pokemonName={pokemonName} />
                <BuildButtons pokemonName={pokemonName} />
            </section>
        </main>
    )
}

export default SinglePokemon
