import { useEffect, useRef, useState } from "react"

export const useInfiniteScroll = <T>(
    itemsArr: T[],
    initialLimit: number,
    limit: number
) => {
    const [items, setItems] = useState<T[]>(itemsArr.slice(0, initialLimit))
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const pastLimit = useRef(initialLimit)
    const pokemonLimit = initialLimit + limit * page

    const setData = (page: number) => {
        const newItems = itemsArr.slice(pastLimit.current, pokemonLimit)
        if (page >= itemsArr.length) {
            setHasMore(false)
        }
        pastLimit.current = pokemonLimit
        setItems([...items, ...newItems])
        setPage(page + 1)
    }

    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight >= scrollHeight * 0.95 && hasMore) {
            setData(page)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [items])

    return items
}
