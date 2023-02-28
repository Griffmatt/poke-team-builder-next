interface button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

export const Button = ({ text, ...props }: button) => {
    const bgColor = props.className ?? "bg-dark-3"

    return (
        <button {...props} className={`${bgColor} text-light `}>
            <h3>{text}</h3>
        </button>
    )
}
