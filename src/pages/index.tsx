import { type NextPage } from "next"
import { TeamOfTheWeek } from "components/home/teamOfTheWeek"
import { TrendingPokemon } from "components/home/trendingPokemon"

const Home: NextPage = () => {
    return (
        <main>
            <h1>Trending</h1>
            <TrendingPokemon />
            <TeamOfTheWeek />
        </main>
    )
}

export default Home
