import { LoadingCard } from "components/ui/loadingCard"

export const SkeletonPokemonGrid = () => {
    const fillerArr = new Array(30)
    fillerArr.fill("x", 0, 30)
    return (
        <div className="pokemon-card-grid">
            {fillerArr.map((x, index) => (
                <div className="pokemon-card" key={index}>
                    <LoadingCard />
                </div>
            ))}
        </div>
    )
}