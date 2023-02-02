interface Props {
    favorited: boolean
    handleFavorite: (() => void) | null
}

export const FavoritedButton = ({ favorited, handleFavorite }: Props) => {
    const handleClick = () => {
        if (handleFavorite) handleFavorite()

        return null
    }

    return (
        <button
            className=" absolute top-0 right-0 rounded-full"
            onClick={handleClick}
        >
            <div
                className={`h-10 w-10 rounded-full ${
                    favorited
                        ? "bg-favorited"
                        : "bg-dark-3 hover:bg-favorited/50"
                }`}
            />
        </button>
    )
}
