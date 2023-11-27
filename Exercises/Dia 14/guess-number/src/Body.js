//import logo from './logo.svg';
//import './Header.css';
import React from 'react';


function Body(params) {

    let maxNum = params.maxNum;

    const [inputValue, setInputValue] = React.useState(1);
    const [randNum, setRandValue] = React.useState(1);

    React.useEffect(() => {
        // This block of code will run after the component renders
        setRandValue(getRandomValue(maxNum, 1));
    }, [maxNum]);

    const validateInputNumber = (event) => {
        const newValue = Math.min(Math.max(event.target.value, 1), maxNum);
        event.target.value = newValue;
        setInputValue(newValue);
    };

    const checkAnswer = () => {
        //TODO
        if (inputValue === randNum) {
            alert("You win!")
        }
        else {
            alert("You lose! Correct number: " + randNum)
        }

        setRandValue(getRandomValue(maxNum, 1));
    }

    return (
        <div className="Body">
            <button id="button" onClick={checkAnswer}>Guess</button>
            <input
                id="input"
                placeholder="Set your guess"
                type="number"
                min="1"
                max={maxNum}
                defaultValue={inputValue}
                onBlur={validateInputNumber} //on focus out
            />
        </div>
    );
}

function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max - min + min)) + min
}

export default Body;

