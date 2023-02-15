import { LoadingCard } from "components/pokemonCards/ui/loadingCard"

export const SkeletonTeamRow = ({ amount = 6 }) => {
    const fillerArr = Array.from({ length: amount }, () => 0)
    return (
        <div className="grid gap-3">
            <div className="h-6 w-32 animate-pulse bg-dark-2" />
            <div className="pokemon-team-row">
                {fillerArr.map((_, index) => (
                    <div className="pokemon-card" key={index}>
                        <LoadingCard />
                    </div>
                ))}
            </div>
        </div>
    )
}
