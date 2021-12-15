import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {Button} from './Components/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/store";
import {
    IncCounterValueAC,
    SetChangeModeAC, SetIncorrectAC, SetIsCheckedAC,
    SetMaxValueAC,
    SetMinValueAC, SetNightModeAC, SetRadioValueAC,
    SetValueAC
} from "./redux/counterReducer"

type CounterType = {
    value: number,
    minValue: number,
    maxValue: number,
    isChecked: boolean,
    radioValue: string,
    changeMode: boolean,
    incorrect: boolean,
    nightMode: boolean
}

const App = () => {

    const counter = useSelector<AppStateType, CounterType>(state => state.counter)
    const dispatch = useDispatch()

    useEffect(() => {
        let itemMinValue = localStorage.getItem('counterMinValue')
        let itemMaxValue = localStorage.getItem('counterMaxValue')
        let itemValue = localStorage.getItem('counterInitValue')
        if (itemMinValue) {
            let newValue = JSON.parse(itemMinValue)
            dispatch(SetMinValueAC(+newValue))
            //setMinValue(+newValue)
        }
        if (itemMaxValue) {
            let newValue = JSON.parse(itemMaxValue)
            dispatch(SetMaxValueAC(+newValue))
            //setMaxValue(+newValue)
        }
        if (itemValue) {
            let newValue = JSON.parse(itemValue)
            dispatch(SetValueAC(+newValue))
            //setInitValue(newValue)
        }
        dispatch(SetChangeModeAC(false))
        //setChangeMode(false)
    }, []) //1 time

    useEffect(() => {
        if (!counter.isChecked) {
            localStorage.setItem('counterMinValue', JSON.stringify(counter.minValue))
            localStorage.setItem('counterMaxValue', JSON.stringify(counter.maxValue))
        }
        localStorage.setItem('counterInitValue', JSON.stringify(counter.value))
    }, [counter.value])

    const incHandler = () => {
        dispatch(IncCounterValueAC())
        //setInitValue(initValue + 1)
    }
    const resetHandler = () => {
        if (counter.isChecked) {
            localStorage.clear()
            dispatch(SetValueAC(0))
            //setInitValue(0)
            localStorage.setItem('counterInitValue', JSON.stringify(0))
        } else {
            dispatch(SetValueAC(counter.minValue ? counter.minValue : 0))
            //setInitValue(minValue ? minValue : 0)
        }
    }

    const clearMinMaxStorage = () => {
        if (counter.isChecked) {
            localStorage.removeItem('counterMinValue')
            localStorage.removeItem('counterMaxValue')
            dispatch(SetMaxValueAC(0))
            //setMaxValue(0)
            dispatch(SetMinValueAC(0))
            //setMinValue(0)
        }
    }

    const setEditMode = () => {
        dispatch(SetChangeModeAC(false))
        //setChangeMode(false)
        dispatch(SetValueAC(counter.minValue))
        //setInitValue(minValue)
    }

    const minOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        dispatch(SetMinValueAC(Number(value)))
        //setMinValue(Number(value))
        dispatch(SetValueAC(0))
        //setInitValue(0)
        if (Number(value) >= counter.maxValue) {
            dispatch(SetIncorrectAC(true))
            //setIncorrect(true)
        } else {
            dispatch(SetIncorrectAC(false))
            //setIncorrect(false)
            dispatch(SetChangeModeAC(true))
            //setChangeMode(true)
        }
    }
    const maxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        dispatch(SetMaxValueAC(Number(value)))
        //setMaxValue(Number(value))
        dispatch(SetValueAC(0))
        //setInitValue(0)
        if (Number(value) <= counter.minValue) {
            dispatch(SetIncorrectAC(true))
            //setIncorrect(true)
        } else {
            dispatch(SetIncorrectAC(false))
            //setIncorrect(false)
            dispatch(SetChangeModeAC(true))
            //setChangeMode(true)
        }
    }
    let incorrectValue = counter.incorrect ? "Incorrect value!" : ""

    const onChangeRadioHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(SetRadioValueAC(e.currentTarget.value))
        //setRadioValue(e.currentTarget.value)
        dispatch(SetIsCheckedAC(!counter.isChecked))
        //setIsChecked(!isChecked)
        dispatch(SetChangeModeAC(false))
        //setChangeMode(false)
        clearMinMaxStorage()
    }

    const dayNightHandler = () => {
        // let value = e.currentTarget.checked
        dispatch(SetNightModeAC(!counter.nightMode))
        //setNightMode(!nightMode)
    }

    return (
        <div className="App" style={!counter.nightMode ? {backgroundColor: "#121212" ,color: "white"} : {}}>
            <div className="night-container">
                <label>Night Mode</label>
                <input type="checkbox" checked={!counter.nightMode} onChange={dayNightHandler}/>
            </div>
            <div className="radio-container">
                <label htmlFor="" >Edit mode</label>
                <div className="radio">
                    <input id="off"
                           type="radio"
                           name="one"
                           value="Off"
                           className="input-radio"
                           checked={counter.radioValue === "Off"}
                           onChange={onChangeRadioHandler}/>
                    <label htmlFor="off">Off</label>
                    <input id="on"
                           type="radio"
                           name="one"
                           value="On"
                           checked={counter.radioValue === "On"}
                           onChange={onChangeRadioHandler}/>
                    <label htmlFor="on">On</label>
                </div>
            </div>
            {counter.radioValue === "On" && (
                <div className="container" style={!counter.nightMode ? {backgroundColor: "#121212" ,color: "white"} : {}}>
                    <div className="value-container">
                        <div className="value-items">
                            <div className="value-spans">
                                <div><span>max value</span></div>
                                <div><span>min value</span></div>
                            </div>
                            <div className="value-inputs">
                                <div>
                                    <input value={counter.maxValue}
                                           style={counter.incorrect ? {background: "red"} : {background: "gainsboro"}}
                                           onChange={maxOnChangeHandler}
                                           type="number"/>
                                </div>
                                <div>
                                    <input value={counter.minValue}
                                           style={counter.incorrect ? {background: "red"} : {background: "gainsboro"}}
                                           onChange={minOnChangeHandler}
                                           type="number"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <Button callback={setEditMode} disabled={!counter.changeMode || counter.incorrect} name={'set'}/>
                    </div>
                </div>)}
            <div className="container" style={!counter.nightMode ? {backgroundColor: "#121212" ,color: "white"} : {}}>
                <div className="value-container">
                    {counter.incorrect
                        ? <h1 style={{color: "red"}}>{incorrectValue}</h1>
                        : <h1 style={(counter.value === counter.maxValue && counter.value !== 0) ? {
                            color: "red",
                            fontSize: "32px",
                            fontWeight: 900
                        } : {}}>{!counter.changeMode ? counter.value : "enter values and press 'set'"}</h1>
                    }
                </div>
                <div className="button-container">
                    <Button callback={incHandler} disabled={counter.isChecked && (counter.changeMode || (counter.value === counter.maxValue))}
                            name={'inc'}/>
                    <Button callback={resetHandler} disabled={counter.isChecked && (counter.changeMode || (counter.value === counter.minValue))}
                            name={'reset'}/>
                </div>
            </div>
        </div>
    );
}

export default App;
