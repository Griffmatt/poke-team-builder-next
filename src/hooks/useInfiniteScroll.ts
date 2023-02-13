import { useEffect, useRef, useState } from "react"

export const useInfiniteScroll = <T>(
    itemsArr: T[],
    initialLimit = 24,
    limit = 12
) => {
    const [items, setItems] = useState<T[]>(itemsArr?.slice(0, initialLimit))
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const pastLimit = useRef(initialLimit)
    const [pokemonLimit, setPokemonLimit] = useState(initialLimit)

    const setData = (page: number) => {
        if (!itemsArr || items === null) return
        const newItems = itemsArr.slice(
            pastLimit.current,
            pokemonLimit + limit * page
        )
        if (page >= itemsArr.length) {
            setHasMore(false)
        }
        pastLimit.current = pokemonLimit + limit * page
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
        if (screen.width < 1024) {
            setItems(itemsArr?.slice(0, 18) ?? null)
            setPokemonLimit(18)
            pastLimit.current = 18
        }
    }, [screen.width])

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [items])

    return items
}
