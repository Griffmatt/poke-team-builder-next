import { useEffect, useState } from "react"

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
    const handleFavorite = favorite ? addFavorite : removeFavorite

    useEffect(() => {
        if (!handleFavorite) return
        clearTimeout(timer)
        if (favorited === favorite) return
        timer = setTimeout(handleFavorite, 1000)
    }, [favorite])

    const handleClick = () => {
        setFavorite(!favorite)
    }

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
