import { useLayoutEffect, useState } from "react"

export const useScreenSize = () => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    useLayoutEffect(() => {
        const updateSize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }
        window.addEventListener("resize", updateSize)
        updateSize()
        return () => window.removeEventListener("resize", updateSize)
    }, [])
    return { width, height }
}
