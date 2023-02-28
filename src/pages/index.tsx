import { type NextPage } from "next"
import { TeamOfTheWeek } from "components/home/teamOfTheWeek"
import { TrendingPokemon } from "components/home/trendingPokemon"

const Home: NextPage = () => {
    return (
        <main>
            <h1>Statistics</h1>
            <TrendingPokemon />
            <TeamOfTheWeek />
        </main>
    )
}

export default Home
