import { createContext, useReducer, useContext } from "react";
import { DEFAULT_PRIMARY, DEFAULT_SECONDARY, DEFAULT_THEME } from '../app/constants'

const initialState = {
    theme: DEFAULT_THEME,
    primaryCurrency: DEFAULT_PRIMARY,
    secondaryCurrency: DEFAULT_SECONDARY,
    currencyData: {},


};

const StoreContext = createContext(initialState)
const DispatchContext = createContext({});

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'SET_PRIMARY':
            return {
                ...state,
                primaryCurrency: action.payload
            }
        case 'SET_SECONDARY':
            return {
                ...state,
                secondaryCurrency: action.payload
            }
        case 'SET_CURRENCY':
            return {
                ...state,
                currencyData: action.payload
            }
        case 'SET_GRAPH_DATA':
            return {
                ...state,
                currencyData: action.payload
            }
        default:
            throw new Error();
    }
};

const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);
    return (
        <DispatchContext.Provider value={dispatch} >
            <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
        </DispatchContext.Provider >
    );
}

const useDispatch = () => {
    return useContext(DispatchContext);
}
const useStore = () => {
    return useContext(StoreContext);
}

export { StoreProvider, StoreContext, DispatchContext, useDispatch, useStore }