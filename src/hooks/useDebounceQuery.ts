import { useEffect, useState } from "react"

export const useDebounceQuery = (query: string, time = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState("")
    let timer: NodeJS.Timeout | undefined

    useEffect(() => {
        timer = setTimeout(() => setDebouncedValue(query), time)

        return () => clearTimeout(timer)
    }, [query])

    return debouncedValue
}
