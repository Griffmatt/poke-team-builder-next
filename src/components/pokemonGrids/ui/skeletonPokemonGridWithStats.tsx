import { LoadingCardWithStats } from "components/pokemonCards/ui/loadingCardWithStats"
import React from "react"

export const SkeletonPokemonGridWithStats = ({ amount = 6 }) => {
    const fillerArr = Array.from({ length: amount }, () => 0)

    return (
        <div className="grid gap-2 sm:grid-cols-2">
            {fillerArr.map((_, index) => (
                <React.Fragment key={index}>
                    <LoadingCardWithStats />
                </React.Fragment>
            ))}
        </div>
    )
}
