import { type NextPage } from "next"
import { RecentPokemon } from "components/boxes/recentPokemon"
import { PopularPokemon } from "components/boxes/popularPokemon"
import { BoxesNav } from "components/boxes/boxesNav"

const BoxesPokemon: NextPage = () => {
    return (
        <main>
            <BoxesNav selected="pokemon" />
            <h1>Boxes</h1>
            <PopularPokemon />
            <RecentPokemon />
        </main>
    )
}

export default BoxesPokemon
