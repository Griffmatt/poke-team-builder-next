import { type NextPage } from "next"
import { BoxesNav } from "components/boxes/boxesNav"
import { RecentPokemon } from "components/boxes/recentPokemon"
import { RecentTeams } from "components/boxes/recentTeams"

const Boxes: NextPage = () => {
    return (
        <main>
            <h1>Boxes</h1>
            <BoxesNav selected="pokemon" />
            <RecentPokemon />
            <RecentTeams />
        </main>
    )
}

export default Boxes
