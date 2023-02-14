import React from "react"
import { SkeletonTeamRow } from "./skeletonTeamRow"

export const SkeletonTeamRows = () => {
    const fillerArr = Array.from({ length: 5 }, () => 0)
    return (
        <>
            {fillerArr.map((_, index) => (
                <React.Fragment key={index}>
                    <SkeletonTeamRow />
                </React.Fragment>
            ))}
        </>
    )
}
