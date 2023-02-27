import { useState } from "react"

interface Props {
    favorited: boolean
    addFavorite?: () => void
    removeFavorite?: () => void
    absolute?: boolean
    small?: boolean
    displayOnly?: boolean
}

let timer: NodeJS.Timeout | undefined

export const FavoritedButton = ({
    favorited,
    addFavorite,
    removeFavorite,
    absolute = true,
    small = false,
    displayOnly,
}: Props) => {
    const absoluteClass = absolute ? "absolute top-1 right-1 " : ""
    const size = small ? "w-6 h-6" : "h-8 w-8"

    const [favorite, setFavorite] = useState(favorited)
    const handleFavorite = favorite ? removeFavorite : addFavorite

    const handleClick = () => {
        if (handleFavorite == null) return
        setFavorite(!favorite)
        clearTimeout(timer)
        if (favorite !== favorited) return
        timer = setTimeout(() => {
            handleFavorite()
            timer = undefined
        }, 500)
    }

    /*
    working on trying to make function call on unMount
    works but has UI bugs
    useEffect(() => {
        timer = undefined
        return () => {
            if (timer && handleFavorite) {
                clearTimeout(timer)
                handleFavorite()
            }
        }
    }, [])*/

    return (
        <>
            {displayOnly ? (
                <div
                    className={`${size} ${absoluteClass} rounded-full ${
                        favorite ? "bg-gold" : "bg-dark-3 hover:bg-gold/50"
                    }`}
                />
            ) : (
                <button
                    className={`${size} ${absoluteClass} rounded-full ${
                        favorite ? "bg-gold" : "bg-dark-3 hover:bg-gold/50"
                    }`}
                    onClick={handleClick}
                />
            )}
        </>
    )
}
