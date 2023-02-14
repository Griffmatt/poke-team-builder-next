import {
    createContext,
    type ReactNode,
    useContext,
    useReducer,
    useState,
    useCallback,
} from "react"

interface PokemonValues {
    ability: string | null
    nature: string | null
    heldItem: string | null
    teraType: string | null
    moves: string[]
    stats: {
        stat: string
        value: number
    }[]
}

interface Context {
    selectedPokemonData: PokemonValues
    handleChange: (data: Partial<PokemonValues>) => void
    handleMovesChange: (moveName: string) => void
    setInitialMoves: (moves: string[]) => void
    statsIndex: number
    handleStatsChange: (
        stats: {
            stat: string
            value: number
        }[],
        index: number
    ) => void
    resetData: () => void
}

interface Props {
    children: ReactNode
}

const SelectedContext = createContext({} as Context)

export function useSelectedContext() {
    return useContext(SelectedContext)
}

export function SelectedContextProvider({ children }: Props) {
    const [statsIndex, setStatsIndex] = useState(0)
    const [selectedPokemonData, setSelectedPokemonData] = useReducer(
        (initial: PokemonValues, data: Partial<PokemonValues>) => {
            return { ...initial, ...data }
        },
        {
            ability: null,
            nature: null,
            heldItem: null,
            teraType: null,
            moves: [],
            stats: [],
        }
    )

    const handleChange = useCallback((data: Partial<PokemonValues>) => {
        setSelectedPokemonData(data)
    }, [])

    const handleMovesChange = useCallback(
        (moveName: string) => {
            if (selectedPokemonData.moves.includes(moveName)) {
                const filterName = selectedPokemonData.moves.filter(
                    (move) => move !== moveName
                )
                setSelectedPokemonData({ moves: filterName })
                return
            }
            if (selectedPokemonData.moves.length >= 4) return

            setSelectedPokemonData({
                moves: [...selectedPokemonData.moves, moveName],
            })
        },
        [selectedPokemonData.moves]
    )

    const setInitialMoves = useCallback((moves: string[]) => {
        setSelectedPokemonData({ moves: moves })
    }, [])

    const handleStatsChange = useCallback(
        (stats: { stat: string; value: number }[], index: number) => {
            setSelectedPokemonData({ stats: stats })
            setStatsIndex(index)
        },
        []
    )

    const resetData = useCallback(() => {
        setSelectedPokemonData({
            ability: null,
            nature: null,
            heldItem: null,
            teraType: null,
            moves: [],
            stats: [],
        })
    }, [])

    return (
        <SelectedContext.Provider
            value={{
                selectedPokemonData,
                handleChange,
                handleMovesChange,
                setInitialMoves,
                statsIndex,
                handleStatsChange,
                resetData,
            }}
        >
            {children}
        </SelectedContext.Provider>
    )
}
