import { useRouter } from "next/router"
import Link from "next/link"

interface Props {
    href: string
    children: JSX.Element
    className?: string
    exact?: boolean
}

export const NavLink = ({ href, children, className, exact }: Props) => {
    const { pathname } = useRouter()
    let isActive = false
    if (exact) {
        isActive = pathname === href
    }
    if (!exact) {
        const path = pathname.split("/")
        const to = href.split("/")
        isActive = path[1] === to[1]
    }

    return (
        <Link
            href={href}
            className={`${
                isActive ? `border-b-2 dark:border-primary` : null
            } ${className}`}
        >
            {children}
        </Link>
    )
}
