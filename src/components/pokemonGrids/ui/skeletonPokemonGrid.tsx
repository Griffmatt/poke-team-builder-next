import { LoadingCard } from "components/ui/loadingCard"

export const SkeletonPokemonGrid = ({ amount = 30 }) => {
    const fillerArr = new Array(amount)
    fillerArr.fill("x", 0, amount)
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
