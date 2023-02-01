import { useSession } from "next-auth/react"
import { api } from "../../utils/api"
import { PokemonCardGrid } from "../pokemonCardGrid"

const PopularPokemon = () => {
    const { data: session } = useSession()
    const { data: popularPokemon } = api.statistics.getPopularPokemon.useQuery()
    return (
        <div className="grid gap-3">
            <h2>Popular Pokemon</h2>
            {popularPokemon && (
                <PokemonCardGrid
                    pokemonArr={popularPokemon}
                    linkTo="stats"
                    userId={session?.user?.id}
                />
            )}
        </div>
    )
}

export { PopularPokemon }
