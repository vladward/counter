import React, {useEffect, useState} from 'react';
import './App.css';
import {Button} from './Components/Button/Button';

const App = () => {
    const [startValue, setStartValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)

    useEffect(() => {
        let item = localStorage.getItem('counterValue')
        if (item) {
            let newValue = JSON.parse(item)
            setStartValue(newValue)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(startValue))
    }, [startValue])

    const incHandler = () => {
        setStartValue(startValue + 1)
    }
    const resetHandler = () => {
        localStorage.clear()
        setStartValue(0)
    }

    const disabledInc = startValue === 5
    const disabledRes = startValue === 0


    return (
        <div className="App">
            <div className="value-container">
                <h1>{startValue}</h1>
            </div>
            <div className="button-container">
                <Button callback={incHandler} disabled={disabledInc} name={'inc'}/>
                <Button callback={resetHandler} disabled={disabledRes} name={'reset'}/>
            </div>
        </div>
    );
}

export default App;
