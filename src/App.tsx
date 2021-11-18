import React, {useState} from 'react';
import './App.css';
import { Button } from './Components/Button/Button';

const App = () => {
    const [startValue, setStartValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)

    const incHandler = () => {
        setStartValue(startValue + 1)
        setFromLocStorage()
    }
    const resetHandler = () => {
      setStartValue(0)
        setFromLocStorage()
    }

    const disabledInc = startValue === 5
    const disabledRes = startValue === 0

    const setFromLocStorage = () => {
        localStorage.setItem('counterValue', JSON.stringify(startValue))
    }
    const getFromLocStorage = () => {
        let item = localStorage.getItem('counterValue')
        if (item) {
            let newValue = JSON.parse(item)
            setStartValue(newValue)
        }
    }

    return (
        <div className="App">
            <div className="value-container">
                <h1>{startValue}</h1>
            </div>
            <div className="button-container">
                <Button callback={incHandler} disabled={disabledInc} name={'inc'} />
                <Button callback={resetHandler} disabled={disabledRes} name={'reset'} />
            </div>
        </div>
    );
}

export default App;
