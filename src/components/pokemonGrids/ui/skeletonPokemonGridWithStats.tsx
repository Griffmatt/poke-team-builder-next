import { LoadingCardWithStats } from "components/pokemonCards/ui/loadingCardWithStats"

export const SkeletonPokemonGridWithStats = ({ amount = 6 }) => {
    const fillerArr = Array.from({ length: amount }, () => 0)

    return (
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {fillerArr.map((_, index) => (
                <div className="pokemon-card" key={index}>
                    <LoadingCardWithStats />
                </div>
            ))}
        </div>
    )
}
