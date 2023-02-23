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

    useEffect(() => {
        const setData = (page: number) => {
            if (!itemsArr || items === null) return
            const newItems = itemsArr.slice(
                pastLimit.current,
                pastLimit.current + limit
            )
            if (page >= itemsArr.length) {
                setHasMore(false)
            }
            pastLimit.current = initialLimit + limit * page
            setItems((prev) => [...prev, ...newItems])
            setPage((prev) => prev + 1)
        }

        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight

            if (scrollTop + clientHeight >= scrollHeight * 0.95 && hasMore) {
                setData(page)
            }
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [hasMore, initialLimit, items, itemsArr, limit, page])

    return items
}
