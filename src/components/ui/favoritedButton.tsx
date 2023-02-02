interface Props {
    favorited: boolean
    handleFavorite?: (() => void) | null
    absolute?: boolean
}

export const FavoritedButton = ({
    favorited,
    handleFavorite = null,
    absolute = true,
}: Props) => {
    const wrapperClass = absolute
        ? "absolute top-1 right-1 rounded-full"
        : "rounded-full"

    return (
        <>
            {handleFavorite ? (
                <button className={wrapperClass} onClick={handleFavorite}>
                    <div
                        className={`h-10 w-10 rounded-full ${
                            favorited
                                ? "bg-favorited"
                                : "bg-dark-3 hover:bg-favorited/50"
                        }`}
                    />
                </button>
            ) : (
                <div className={wrapperClass}>
                    <div
                        className={`h-10 w-10 rounded-full ${
                            favorited
                                ? "bg-favorited"
                                : "bg-dark-3 hover:bg-favorited/50"
                        }`}
                    />
                </div>
            )}
        </>
    )
}
