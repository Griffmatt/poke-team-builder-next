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
                        ? "bg-lime-400 hover:bg-lime-400/50"
                        : "bg-slate-500 hover:bg-slate-500/50"
                }`}
            />
        </button>
    )
}
