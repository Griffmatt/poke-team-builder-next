import Link from "next/link"

interface Props {
    selected: "popular" | "search"
}

const BoxesNav = ({ selected }: Props) => {
    return (
        <div className="flex justify-center gap-2">
            <Link href={"/boxes"}>
                <h3 className={selected === "popular" ? "border-b-2" : ""}>
                    Popular
                </h3>
            </Link>
            <Link href={"/boxes/userSearch"}>
                <h3 className={selected === "search" ? "border-b-2" : ""}>
                    Search
                </h3>
            </Link>
        </div>
    )
}

export { BoxesNav }
