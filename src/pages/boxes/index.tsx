import { type NextPage } from "next"
import { BoxesNav } from "components/boxes/boxesNav"
import { PopularPokemon } from "components/boxes/popularPokemon"
import { PopularTeams } from "components/boxes/popularTeams"

const Boxes: NextPage = () => {
    return (
        <main>
            <h1>Boxes</h1>
            <BoxesNav selected="popular" />
            <PopularPokemon />
            <PopularTeams />
        </main>
    )
}

export default Boxes
