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

    const debounce = () => {
        if (!handleFavorite) return null
        clearTimeout(timer)
        setFavorite(!favorite)
        if (favorited !== favorite) return null
        timer = setTimeout(handleFavorite, 1000)
    }

    return (
        <>
            {handleFavorite ? (
                <button className={wrapperClass} onClick={debounce}>
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
