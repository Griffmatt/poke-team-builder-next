import { LoadingCard } from "components/pokemonCards/ui/loadingCard"

export const SkeletonPokemonGrid = ({
    amount = 30,
    withStats = false,
    dataGrid = false,
}) => {
    const fillerArr = Array.from({ length: amount }, () => 0)
    const className = withStats
        ? "grid gap-2 md:grid-cols-3"
        : dataGrid
        ? "pokemon-card-grid"
        : "pokemon-data-grid"

    return (
        <div className={className}>
            {fillerArr.map((_, index) => (
                <div className="pokemon-card" key={index}>
                    <LoadingCard />
                </div>
            ))}
        </div>
    )
}
