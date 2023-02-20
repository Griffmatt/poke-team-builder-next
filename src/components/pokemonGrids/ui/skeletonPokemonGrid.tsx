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
        ? "pokemon-grid-data-layout "
        : " pokemon-grid-card-layout"

    return (
        <div className={className}>
            {fillerArr.map((_, index) => (
                <div className="pokemon-card" key={index}>
                    <LoadingCard percentage={dataGrid} />
                </div>
            ))}
        </div>
    )
}
