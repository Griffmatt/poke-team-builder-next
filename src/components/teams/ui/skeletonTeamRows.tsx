import React from "react"
import { SkeletonTeamRow } from "./skeletonTeamRow"

interface Props {
    rows?: number
}

export const SkeletonTeamRows = ({ rows = 5 }: Props) => {
    const fillerArr = Array.from({ length: rows }, () => 0)
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
