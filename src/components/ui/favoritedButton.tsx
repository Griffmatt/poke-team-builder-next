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
    const wrapperClass = absolute
        ? "absolute top-1 right-1 rounded-full"
        : "rounded-full"
    const size = small ? "w-6 h-6" : "h-10 w-10"

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
                <div className={wrapperClass}>
                    <div
                        className={`${size} rounded-full ${
                            favorite ? "bg-gold" : "bg-dark-3 hover:bg-gold/50"
                        }`}
                    />
                </div>
            ) : (
                <button className={wrapperClass} onClick={handleClick}>
                    <div
                        className={`${size} rounded-full ${
                            favorite ? "bg-gold" : "bg-dark-3 hover:bg-gold/50"
                        }`}
                    />
                </button>
            )}
        </>
    )
}
