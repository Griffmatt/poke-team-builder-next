import { Pokemon } from "pokenode-ts"
import { useEffect, useState } from "react"

export const useInfiniteScroll = (pokemon: Pokemon[], limit: number) => {
    const [items, setItems] = useState<Pokemon[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const pokemonLimit = limit * page

    useEffect(() => {
        fetchData(page)
    }, [page])

    const fetchData = (page: number) => {
        const newItems = pokemon.slice(pokemonLimit - limit, pokemonLimit)
        if (page >= pokemon.length) {
            setHasMore(false)
        }

        setItems([...items, ...newItems])
    }

    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight >= scrollHeight * .95 && hasMore) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [items])

    return items
}
