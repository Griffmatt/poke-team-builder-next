import { useState } from "react"

interface Props {
    favorited: boolean
    addFavorite?: () => void
    removeFavorite?: () => void
    absolute?: boolean
}

let timer: NodeJS.Timeout | undefined

export const FavoritedButton = ({
    favorited,
    addFavorite,
    removeFavorite,
    absolute = true,
}: Props) => {
    const wrapperClass = absolute
        ? "absolute top-1 right-1 rounded-full"
        : "rounded-full"

    const [favorite, setFavorite] = useState(favorited)
    const handleFavorite = favorite ? removeFavorite : addFavorite

    const handleClick = () => {
        setFavorite(!favorite)
        if (handleFavorite == null) return
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
            {handleFavorite ? (
                <button className={wrapperClass} onClick={handleClick}>
                    <div
                        className={`h-10 w-10 rounded-full ${
                            favorite
                                ? "bg-favorited"
                                : "bg-dark-3 hover:bg-favorited/50"
                        }`}
                    />
                </button>
            ) : (
                <div className={wrapperClass}>
                    <div
                        className={`h-10 w-10 rounded-full ${
                            favorite
                                ? "bg-favorited"
                                : "bg-dark-3 hover:bg-favorited/50"
                        }`}
                    />
                </div>
            )}
        </>
    )
}
