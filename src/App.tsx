import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {Button} from './Components/Button/Button';

const App = () => {
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)

    useEffect(() => {
        let item = localStorage.getItem('counterValue')
        if (item) {
            let newValue = JSON.parse(item)
            setMinValue(newValue)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(minValue))
    }, [minValue])

    const incHandler = () => {
        setMinValue(minValue + 1)
    }
    const resetHandler = () => {
        localStorage.clear()
        setMinValue(0)
    }

    const minOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setMinValue(Number(value))
    }

    const disabledInc = minValue === 5
    const disabledRes = minValue === 0


    return (
        <div className="App">
            <div className="container">
                <div className="value-container">
                    <div className="value-items">
                        <div className="value-spans">
                            <div><span>max value</span></div>
                            <div><span>min value</span></div>
                        </div>
                        <div className="value-inputs">
                            <div><input value={maxValue} type="number"/></div>
                            <div><input value={minValue} onChange={minOnChangeHandler} type="number"/></div>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <Button callback={incHandler} disabled={disabledInc} name={'set'}/>
                </div>
            </div>
            <div className="container">
                <div className="value-container">
                    <h1>{minValue}</h1>
                </div>
                <div className="button-container">
                    <Button callback={incHandler} disabled={disabledInc} name={'inc'}/>
                    <Button callback={resetHandler} disabled={disabledRes} name={'reset'}/>
                </div>
            </div>
        </div>
    );
}

export default App;
