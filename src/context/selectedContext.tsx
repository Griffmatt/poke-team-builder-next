import { createContext, ReactNode, useContext, useReducer } from "react"

interface PokemonValues {
    ability: string | null
    nature: string | null
    heldItem: string | null
    teraType: string | null
    moves: string[]
}

interface Context {
    selectedPokemonData: PokemonValues
    handleChange: (data: Partial<PokemonValues>) => void
    handleMovesChange: (moveName: string) => void
    setInitialMoves: (moves: string[]) => void
}

interface Props {
    children: ReactNode
}

const SelectedContext = createContext({} as Context)

export function useSelectedContext() {
    return useContext(SelectedContext)
}

export function SelectedContextProvider({ children }: Props) {
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
        }
    )

    const handleChange = (data: Partial<PokemonValues>) => {
        setSelectedPokemonData(data)
    }

    const handleMovesChange = (moveName: string) => {
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
    }

    const setInitialMoves = (moves: string[]) => {
        setSelectedPokemonData({ moves: moves })
    }

    return (
        <SelectedContext.Provider
            value={{
                selectedPokemonData,
                handleChange,
                handleMovesChange,
                setInitialMoves,
            }}
        >
            {children}
        </SelectedContext.Provider>
    )
}
