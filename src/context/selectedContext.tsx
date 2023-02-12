import {
    createContext,
    ReactNode,
    useContext,
    useReducer,
} from "react"

interface PokemonValues {
    ability: string | null
    nature: string | null
    heldItem: string | null
    teraType: string | null
    moves: string[] | null
}

interface Context {
    selectedPokemonData: PokemonValues
    handleChange: (data: Partial<PokemonValues>) => void
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
        console.log(selectedPokemonData)
    }

    return (
        <SelectedContext.Provider value={{ selectedPokemonData, handleChange }}>
            {children}
        </SelectedContext.Provider>
    )
}
