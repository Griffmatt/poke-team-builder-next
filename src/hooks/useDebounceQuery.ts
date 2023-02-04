import { type Dispatch, type SetStateAction } from "react"

export const useDebounceQuery = (
    setQuery: Dispatch<SetStateAction<string>>,
    time = 1000
) => {
    let timer: NodeJS.Timeout | undefined
    const debounceQuery = (query: string) => {
        clearTimeout(timer)
        timer = setTimeout(() => setQuery(query), time)
    }

    return { debounceQuery }
}
