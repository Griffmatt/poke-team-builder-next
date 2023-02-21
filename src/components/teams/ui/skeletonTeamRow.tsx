export const SkeletonTeamRow = ({ amount = 6 }) => {
    const fillerArr = Array.from({ length: amount }, () => 0)
    return (
        <div className="grid gap-3">
            <div className="h-6 w-32 animate-pulse bg-dark-2" />
            <div className="pokemon-team-row">
                {fillerArr.map((_, index) => (
                    <div className="w-full p-2 md:p-3" key={index}>
                        <div className="aspect-square w-full animate-pulse rounded-full border-2 border-dark-2 bg-dark-3  shadow-black shadow-md" />
                    </div>
                ))}
            </div>
        </div>
    )
}
