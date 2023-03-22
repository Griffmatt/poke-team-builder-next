import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useScreenSize } from "./useScreenSize"

export const useInfiniteScroll = <T>(itemsArr: T[]) => {
    const [items, setItems] = useState<T[] | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)

    const [loadLimit, setLoadLimit] = useState(6)
    const [initialLimit, setInitialLimit] = useState(30)
    const pastLimit = useRef(0)
    const { width } = useScreenSize()

    useLayoutEffect(() => {
        if (width >= 1024) {
            const dif = pastLimit.current % 6
            const max = Math.max(30, pastLimit.current + 6 - dif)
            pastLimit.current = max
            setInitialLimit(30)
            setItems(itemsArr?.slice(0, max))
            setLoadLimit(6)
        }
        if (width < 1024 && width > 640) {
            const dif = pastLimit.current % 4
            const max = Math.max(20, pastLimit.current + 4 - dif)
            setInitialLimit(20)
            setItems(itemsArr?.slice(0, max))
            setLoadLimit(4)
        }
        if (width <= 640 && width >= 425) {
            const dif = pastLimit.current % 3
            const max = Math.max(12, pastLimit.current + 3 - dif)
            setInitialLimit(12)
            setItems(itemsArr?.slice(0, max))
            setLoadLimit(3)
        }
        if (width < 425) {
            const dif = pastLimit.current % 2
            const max = Math.max(8, pastLimit.current + 4 - dif)
            setInitialLimit(8)
            setItems(itemsArr?.slice(0, max))
            setLoadLimit(2)
        }
    }, [itemsArr, width])

    useEffect(() => {
        setItems(itemsArr.slice(0, initialLimit))
        setHasMore(true)
        setPage(0)
    }, [initialLimit, itemsArr])

    useEffect(() => {
        const setData = () => {
            if (!itemsArr || items === null) return
            const maxLimit = Math.min(itemsArr.length, 120)
            const sliceLimit = Math.min(pastLimit.current + loadLimit, maxLimit)
            const newItems = itemsArr.slice(0, sliceLimit)
            if (sliceLimit === maxLimit) {
                setHasMore(false)
            }
            setItems(newItems)
            setPage((prev) => prev + 1)
        }

        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight
            if (scrollTop + clientHeight >= scrollHeight * 0.98 && hasMore) {
                pastLimit.current = initialLimit + loadLimit * page
                setData()
            }
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [hasMore, initialLimit, items, itemsArr, loadLimit, page, pastLimit])

    return items ?? []
}
