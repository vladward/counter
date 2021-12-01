import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {Button} from './Components/Button/Button';

const App = () => {
    const [initValue, setInitValue] = useState(0)
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    const [isChecked, setIsChecked] = useState(false)
    const [radioValue, setRadioValue] = useState('Off')
    const [changeMode, setChangeMode] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [nightMode, setNightMode] = useState(true)

    useEffect(() => {
        let itemMinValue = localStorage.getItem('counterMinValue')
        let itemMaxValue = localStorage.getItem('counterMaxValue')
        let itemValue = localStorage.getItem('counterInitValue')
        if (itemMinValue) {
            let newValue = JSON.parse(itemMinValue)
            setMinValue(+newValue)
        }
        if (itemMaxValue) {
            let newValue = JSON.parse(itemMaxValue)
            setMaxValue(+newValue)
        }
        if (itemValue) {
            let newValue = JSON.parse(itemValue)
            setInitValue(newValue)
        }
        setChangeMode(false)
    }, []) //1 time

    useEffect(() => {
        if (isChecked) {
            localStorage.setItem('counterMinValue', JSON.stringify(minValue))
            localStorage.setItem('counterMaxValue', JSON.stringify(maxValue))
        }
        localStorage.setItem('counterInitValue', JSON.stringify(initValue))
    }, [initValue])

    const incHandler = () => {
        setInitValue(initValue + 1)
    }
    const resetHandler = () => {
        if (!isChecked) {
            localStorage.clear()
            setInitValue(0)
            localStorage.setItem('counterInitValue', JSON.stringify(0))
        } else {
            setInitValue(minValue ? minValue : 0)
        }
    }

    const clearMinMaxStorage = () => {
        if (isChecked) {
            localStorage.removeItem('counterMinValue')
            localStorage.removeItem('counterMaxValue')
            setMaxValue(0)
            setMinValue(0)
        }
    }

    const setEditMode = () => {
        setChangeMode(false)
        setInitValue(minValue)
    }

    const minOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setMinValue(Number(value))
        setInitValue(0)
        if (Number(value) >= maxValue) {
            setIncorrect(true)
        } else {
            setIncorrect(false)
            setChangeMode(true)
        }
    }
    const maxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setMaxValue(Number(value))
        setInitValue(0)
        if (Number(value) <= minValue) {
            setIncorrect(true)
        } else {
            setIncorrect(false)
            setChangeMode(true)
        }
    }
    let incorrectValue = incorrect ? "Incorrect value!" : ""

    const onChangeRadioHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRadioValue(e.currentTarget.value)
        setIsChecked(!isChecked)
        setChangeMode(false)
        clearMinMaxStorage()
    }

    const dayNightHandler = () => {
        // let value = e.currentTarget.checked
        setNightMode(!nightMode)
    }

    return (
        <div className="App" style={!nightMode ? {backgroundColor: "#121212" ,color: "white"} : {}}>
            <div className="night-container">
                <label>Night Mode</label>
                <input type="checkbox" checked={!nightMode} onChange={dayNightHandler}/>
            </div>
            <div className="radio-container">
                <label htmlFor="" >Edit mode</label>
                <div className="radio">
                    <input id="off"
                           type="radio"
                           name="one"
                           value="Off"
                           className="input-radio"
                           checked={radioValue === "Off"}
                           onChange={onChangeRadioHandler}/>
                    <label htmlFor="off">Off</label>
                    <input id="on"
                           type="radio"
                           name="one"
                           value="On"
                           checked={radioValue === "On"}
                           onChange={onChangeRadioHandler}/>
                    <label htmlFor="on">On</label>
                </div>
            </div>
            {radioValue === "On" && (
                <div className="container" style={!nightMode ? {backgroundColor: "#121212" ,color: "white"} : {}}>
                    <div className="value-container">
                        <div className="value-items">
                            <div className="value-spans">
                                <div><span>max value</span></div>
                                <div><span>min value</span></div>
                            </div>
                            <div className="value-inputs">
                                <div>
                                    <input value={maxValue}
                                           style={incorrect ? {background: "red"} : {background: "gainsboro"}}
                                           onChange={maxOnChangeHandler}
                                           type="number"/>
                                </div>
                                <div>
                                    <input value={minValue}
                                           style={incorrect ? {background: "red"} : {background: "gainsboro"}}
                                           onChange={minOnChangeHandler}
                                           type="number"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <Button callback={setEditMode} disabled={!changeMode || incorrect} name={'set'}/>
                    </div>
                </div>)}
            <div className="container" style={!nightMode ? {backgroundColor: "#121212" ,color: "white"} : {}}>
                <div className="value-container">
                    {incorrect
                        ? <h1 style={{color: "red"}}>{incorrectValue}</h1>
                        : <h1 style={(initValue === maxValue && initValue !== 0) ? {
                            color: "red",
                            fontSize: "32px",
                            fontWeight: 900
                        } : {}}>{!changeMode ? initValue : "enter values and press 'set'"}</h1>
                    }
                </div>
                <div className="button-container">
                    <Button callback={incHandler} disabled={isChecked && (changeMode || (initValue === maxValue))}
                            name={'inc'}/>
                    <Button callback={resetHandler} disabled={isChecked && (changeMode || (initValue === minValue))}
                            name={'reset'}/>
                </div>
            </div>
        </div>
    );
}

export default App;
