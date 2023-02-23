import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useScreenSize } from "./useScreenSize"

export const useInfiniteScroll = <T>(itemsArr: T[]) => {
    const [items, setItems] = useState<T[]>(itemsArr?.slice(0, 30))
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const [loadLimit, setLoadLimit] = useState(6)
    const [initialLimit, setInitialLimit] = useState(6)
    const { width } = useScreenSize()
    const pastLimit = useRef(0)

    useLayoutEffect(() => {
        setPage(1)
        if (width >= 1024) {
            setInitialLimit(30)
            setItems(itemsArr?.slice(0, 30))
            setLoadLimit(6)
        }
        if (width < 1024 && width > 640) {
            setInitialLimit(20)
            setItems(itemsArr?.slice(0, 20))
            setLoadLimit(4)
        }
        if (width <= 640 && width >= 425) {
            setInitialLimit(12)
            setItems(itemsArr?.slice(0, 12))
            setLoadLimit(3)
        }
        if (width < 425) {
            setInitialLimit(8)
            setItems(itemsArr?.slice(0, 8))
            setLoadLimit(2)
        }
    }, [width, itemsArr])

    useEffect(() => {
        const setData = (page: number) => {
            if (!itemsArr || items === null) return
            const newItems = itemsArr.slice(
                pastLimit.current,
                pastLimit.current + loadLimit
            )
            if (page >= itemsArr.length) {
                setHasMore(false)
            }
            pastLimit.current = initialLimit + loadLimit * page
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
    }, [hasMore, initialLimit, items, itemsArr, loadLimit, page])

    return items
}
