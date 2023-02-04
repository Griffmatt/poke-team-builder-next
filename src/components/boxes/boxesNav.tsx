import Link from "next/link"

interface Props {
    selected: "pokemon" | "trainers"
}

export const BoxesNav = ({ selected }: Props) => {
    return (
        <div className="flex justify-center gap-2">
            <Link href={"/boxes"}>
                <h3 className={selected === "pokemon" ? "border-b-2" : ""}>
                    Pokemon
                </h3>
            </Link>
            <Link href={"/boxes/userSearch"}>
                <h3 className={selected === "trainers" ? "border-b-2" : ""}>
                    Trainers
                </h3>
            </Link>
        </div>
    )
}
