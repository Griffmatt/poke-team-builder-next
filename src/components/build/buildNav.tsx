import { useSession } from "next-auth/react"
import Link from "next/link"

interface Props {
    selected: "pokemon" | "team"
}

export const BuildNav = ({ selected }: Props) => {
    const { data: session } = useSession()
    return (
        <div className="flex justify-center gap-2">
            <Link href={"/build/pokemon"}>
                <h3 className={selected === "pokemon" ? "border-b-2" : ""}>
                    Pokemon
                </h3>
            </Link>
            {session?.user && (
                <Link href={"/build/team"}>
                    <h3 className={selected === "team" ? "border-b-2" : ""}>
                        Team
                    </h3>
                </Link>
            )}
        </div>
    )
}

