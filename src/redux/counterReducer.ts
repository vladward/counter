type InitialStateType = typeof initialState
type ActionType = IncCounterValueActionType
    | SetValueActionType
    | SetValueFromLocalStorageActionType
    | SetMinValueActionType
    | SetMaxValueActionType
    | SetIsCheckedActionType
    | SetRadioValueActionType
    | SetChangeModeActionType
    | SetIncorrectActionType
    | SetNightModeActionType

const initialState = {
    value: 0,
    minValue: 0,
    maxValue: 0,
    isChecked: false,
    radioValue: 'Off',
    changeMode: false,
    incorrect: false,
    nightMode: true
}

export const IncCounterValueAC = () => ({type: INC_VALUE} as const)
const INC_VALUE = 'INC_VALUE'
export type IncCounterValueActionType = ReturnType<typeof IncCounterValueAC>

export const SetValueAC = (value: number) => ({type: SET_VALUE, value} as const)
const SET_VALUE = 'SET_VALUE'
export type SetValueActionType = ReturnType<typeof SetValueAC>

export const SetMinValueAC = (value: number) => ({type: SET_MIN_VALUE, value} as const)
const SET_MIN_VALUE = 'SET_MIN_VALUE'
export type SetMinValueActionType = ReturnType<typeof SetMinValueAC>

export const SetMaxValueAC = (value: number) => ({type: SET_MAX_VALUE, value} as const)
const SET_MAX_VALUE = 'SET_MAX_VALUE'
export type SetMaxValueActionType = ReturnType<typeof SetMaxValueAC>

export const SetIsCheckedAC = (isChecked: boolean) => ({type: SET_IS_CHECKED, isChecked} as const)
const SET_IS_CHECKED = 'SET_IS_CHECKED'
export type SetIsCheckedActionType = ReturnType<typeof SetIsCheckedAC>

export const SetRadioValueAC = (radioValue: string) => ({type: SET_RADIO_VALUE, radioValue} as const)
const SET_RADIO_VALUE = 'SET_RADIO_VALUE'
export type SetRadioValueActionType = ReturnType<typeof SetRadioValueAC>

export const SetChangeModeAC = (changeMode: boolean) => ({type: SET_CHANGE_MODE, changeMode} as const)
const SET_CHANGE_MODE = 'SET_CHANGE_MODE'
export type SetChangeModeActionType = ReturnType<typeof SetChangeModeAC>

export const SetIncorrectAC = (incorrect: boolean) => ({type: SET_INCORRECT, incorrect} as const)
const SET_INCORRECT = 'SET_INCORRECT'
export type SetIncorrectActionType = ReturnType<typeof SetIncorrectAC>

export const SetNightModeAC = (nightMode: boolean) => ({type: SET_NIGHT_MODE, nightMode} as const)
const SET_NIGHT_MODE = 'SET_NIGHT_MODE'
export type SetNightModeActionType = ReturnType<typeof SetNightModeAC>

export const SetValueFromLocalStorageAC = (value: number) => ({type: SET_VALUE_FROM_LOCAL_STORAGE, value} as const)
const SET_VALUE_FROM_LOCAL_STORAGE = 'SET_VALUE_FROM_LOCAL_STORAGE'
export type SetValueFromLocalStorageActionType = ReturnType<typeof SetValueFromLocalStorageAC>

export const counterReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case INC_VALUE:
            return {...state, value: state.value + 1}
        case SET_VALUE:
            return {...state, value: action.value}
        case SET_VALUE_FROM_LOCAL_STORAGE:
            return {...state, value: action.value}
        case SET_MIN_VALUE:
            return {...state, minValue: action.value}
        case SET_MAX_VALUE:
            return {...state, maxValue: action.value}
        case SET_IS_CHECKED:
            return {...state, isChecked: action.isChecked}
        case SET_RADIO_VALUE:
            return {...state, radioValue: action.radioValue}
        case SET_CHANGE_MODE:
            return {...state, changeMode: action.changeMode}
        case SET_INCORRECT:
            return {...state, incorrect: action.incorrect}
        case SET_NIGHT_MODE:
            return {...state, nightMode: action.nightMode}
        default:
            return state
    }
}