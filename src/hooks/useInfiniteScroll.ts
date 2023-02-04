import { useEffect, useState } from "react"

const useInfiniteScroll = () => {
    const [items, setItems] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    
    useEffect(() => {
    fetchData(page)
    }, [page])
    
    const fetchData = (page) => {
    const newItems = []
    
    for (let i = 0; i < 100; i++) {
    newItems.push(i)
    }
    
    if (page === 100) {
    setHasMore(false)
    }
    
    setItems([...items, ...newItems])
     }
    
    const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    
    if (scrollTop + clientHeight >= scrollHeight) {
    setPage(page + 1)
    }
    }
    
    useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
    }, [items])

}