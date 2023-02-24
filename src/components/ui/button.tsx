interface button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    secondaryText?: string
}

export const Button = ({ text, secondaryText, ...props }: button) => {
    const bgColor = props.className ?? "dark:bg-dark-3"

    return (
        <button {...props} className={`${bgColor} text-light `}>
            <h3>{text}</h3>
            {secondaryText && <p>{secondaryText}</p>}
        </button>
    )
}
