interface Props {
    handleClick: () => void
    type: "-" | "+"
}

export const StatButton = ({ handleClick, type }: Props) => {
    return (
        <button
            className="aspect-square h-7 rounded-xl bg-dark-3 text-xl font-bold text-primary"
            onClick={handleClick}
            type="button"
        >
            {type}
        </button>
    )
}
