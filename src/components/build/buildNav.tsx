import Link from "next/link"

interface Props {
selected: "pokemon" | "team"
}

const BuildNav = ({ selected }: Props) => {
    return (
        <div className="flex justify-center gap-2">
            <Link href={"/build/pokemon"}>
                <h3 className={selected === "pokemon" ? "border-b-2" : ''}>Pokemon</h3>
            </Link>
            <Link href={"/build/team"}>
                <h3 className={selected === "team" ? "border-b-2" : ''}>Team</h3>
            </Link>
        </div>
    )
}

export { BuildNav } 