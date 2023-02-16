import Link from "next/link"

interface Props {
    selected: "pokemon" | "teams"
}

export const BoxesNav = ({ selected }: Props) => {
    return (
        <div className="flex justify-center gap-2">
            <Link href={"/boxes"}>
                <h3 className={selected === "pokemon" ? "border-b-2" : ""}>
                    Pokemon
                </h3>
            </Link>
            <Link href={"/boxes/teams"}>
                <h3 className={selected === "teams" ? "border-b-2" : ""}>
                    Teams
                </h3>
            </Link>
        </div>
    )
}
