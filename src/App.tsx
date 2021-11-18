import React, {useState} from 'react';
import './App.css';

const App = () => {
    const [value, setValue] = useState(0)

    const incHandler = () => {
        setValue(value + 1)
    }

    const resetHandler = () => {
      setValue(0)
    }

    return (
        <div className="App">
            <h1>LocalStorage</h1>

            <h2>0</h2>
            <button onClick={incHandler}>inc</button>
            <button onClick={resetHandler}>reset</button>
        </div>
    );
}

export default App;
