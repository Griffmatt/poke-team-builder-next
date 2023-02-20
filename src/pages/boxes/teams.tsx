import { BoxesNav } from "components/boxes/boxesNav"
import { PopularTeams } from "components/boxes/popularTeams"
import { RecentTeams } from "components/boxes/recentTeams"
import { type NextPage } from "next"

const BoxesPokemon: NextPage = () => {
    return (
        <main>
            <h1>Boxes</h1>
            <BoxesNav selected="teams" />
            <PopularTeams />
            <RecentTeams />
        </main>
    )
}

export default BoxesPokemon
