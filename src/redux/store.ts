import {applyMiddleware, combineReducers, createStore} from "redux";
import {counterReducer} from "./counterReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    counter: counterReducer
})

export const store = createStore(rootReducer)
export type AppStateType = ReturnType<typeof rootReducer>