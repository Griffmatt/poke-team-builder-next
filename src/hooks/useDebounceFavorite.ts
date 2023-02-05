import { useEffect } from "react"
let timer: NodeJS.Timeout | undefined
export const useDebounceFavorite = (
    favorited: boolean | null,
    favorite: boolean,
    callBack: () => void,
    time = 1000
) => {
    useEffect(() => {
        if (favorited === null) return
        clearTimeout(timer)
        timer = setTimeout(callBack, time)
    }, [favorited])

    return favorited ?? favorite
}
