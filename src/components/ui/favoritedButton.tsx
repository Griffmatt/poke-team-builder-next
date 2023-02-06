import { useEffect, useRef, useState } from "react"

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
    const initialLoad = useRef(true)
    const handleFavorite = favorite ? addFavorite : removeFavorite

    useEffect(() => {
        const handleFavorite = favorite ? addFavorite : removeFavorite
        if (!handleFavorite) return
        clearTimeout(timer)
        if (favorited === favorite) return
        timer = setTimeout(handleFavorite, 5000)
    }, [favorite])

    useEffect(() => {
        initialLoad.current = false
        return () => {
            if (timer && !initialLoad.current) {
                const handleFavorite = favorite ? removeFavorite : addFavorite
                clearTimeout(timer)
                if (!handleFavorite || favorited !== favorite) return
                handleFavorite()
            }
        }
    }, [])

    return (
        <>
            {handleFavorite ? (
                <button
                    className={wrapperClass}
                    onClick={() => setFavorite(!favorite)}
                >
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
