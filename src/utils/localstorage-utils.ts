import {AppStateType} from "../redux/store";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('counterInitValue')
        if (!serializedState) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

export const saveState = (state: AppStateType) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}