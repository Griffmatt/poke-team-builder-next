import { LoadingCard } from "components/pokemonCards/ui/loadingCard"

export const SkeletonPokemonGrid = ({ amount = 30, withStats = false }) => {
    const fillerArr = Array.from({ length: amount }, () => 0)
    const className = withStats
        ? "grid gap-2 md:grid-cols-3"
        : "pokemon-card-grid"
    return (
        <div className={className}>
            {fillerArr.map((x, index) => (
                <div className="pokemon-card" key={index}>
                    <LoadingCard />
                </div>
            ))}
        </div>
    )
}
