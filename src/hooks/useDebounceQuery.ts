import { useEffect, useState } from "react"

let timer: NodeJS.Timeout | undefined

export const useDebounceQuery = (query: string, time = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState("")

    useEffect(() => {
        timer = setTimeout(() => setDebouncedValue(query.toLowerCase()), time)

        return () => clearTimeout(timer)
    }, [query])

    return debouncedValue
}
