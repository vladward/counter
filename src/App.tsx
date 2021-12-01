import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {Button} from './Components/Button/Button';

const App = () => {
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    const [endMinValue, setEndMinValue] = useState(0)
    const [endMaxValue, setEndMaxValue] = useState(0)
    const [changeMode, setChangeMode] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [day, setDay] = useState(true)

    useEffect(() => {
        let item = localStorage.getItem('counterValue')
        let itemMaxValue = localStorage.getItem('counterMaxValue')
        let itemEndMinValue = localStorage.getItem('counterEndMinValue')
        let itemEndMaxValue = localStorage.getItem('counterEndMaxValue')
        if (item) {
            let newValue = JSON.parse(item)
            setMinValue(newValue)
        }
        if (itemMaxValue) {
            let newValue = JSON.parse(itemMaxValue)
            setMaxValue(newValue)
        }
        if (itemEndMinValue) {
            let newValue = JSON.parse(itemEndMinValue)
            setEndMinValue(newValue)
        }
        if (itemEndMaxValue) {
            let newValue = JSON.parse(itemEndMaxValue)
            setEndMaxValue(newValue)
        }
        setChangeMode(true)
    }, [])

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(minValue))
        localStorage.setItem('counterMaxValue', JSON.stringify(maxValue))
        localStorage.setItem('counterEndMinValue', JSON.stringify(endMinValue))
        localStorage.setItem('counterEndMaxValue', JSON.stringify(endMaxValue))
    }, [minValue, maxValue, endMinValue, endMaxValue])

    const incHandler = () => {
        setMinValue(minValue + 1)
    }
    const resetHandler = () => {
        localStorage.clear()
        setMinValue(endMinValue)
    }

    const setEditMode = () => {
        setChangeMode(false)
    }

    const minOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setMinValue(Number(value))
        setEndMinValue(Number(value))
        if (Number(value) >= endMaxValue) {
            setIncorrect(true)
        } else {
            setIncorrect(false)
            setChangeMode(true)
        }
    }
    const maxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setMaxValue(Number(value))
        setEndMaxValue(Number(value))
        if (Number(value) <= endMinValue) {
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
        // style={!day ? {color: "white"} : {}}
        setDay(!day)
    }

    return (
        <div className="App">
            <input type="checkbox" checked={!day} onChange={dayNightHandler}/>
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
                <div className="container">
                    <div className="value-container">
                        <div className="value-items">
                            <div className="value-spans">
                                <div><span>max value</span></div>
                                <div><span>min value</span></div>
                            </div>
                            <div className="value-inputs">
                                <div>
                                    <input value={maxValue}
                                           style={incorrect ? {background: "red"} : {}}
                                           onChange={maxOnChangeHandler}
                                           type="number"/>
                                </div>
                                <div>
                                    <input value={minValue}
                                           style={incorrect ? {background: "red"} : {}}
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
            <div className="container">
                <div className="value-container">
                    {incorrect
                    ?   <p style={{color: "red"}}>Incorrect value!</p>
                    :   <p style={minValue === maxValue ? {color: "red", fontSize: "32px", fontWeight: 900} : {}}>{!changeMode ? minValue : "enter values and press 'set'"}</p>
                    }
                </div>
                <div className="button-container">
                    <Button callback={incHandler} disabled={changeMode || (minValue === endMaxValue)} name={'inc'}/>
                    <Button callback={resetHandler} disabled={changeMode || (minValue === endMinValue)} name={'reset'}/>
                </div>
            </div>
        </div>
    );
}

export default App;
