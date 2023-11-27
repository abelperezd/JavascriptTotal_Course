
let inp1;
let inp2 = document.getElementById("inp2");

let result = document.getElementById("result");

window.onload = function () {
    inp1 = document.getElementById("inp1");
    inp2 = document.getElementById("inp2");
    result = document.getElementById("result");
}

function add() {
    setResult(+inp1.value + +inp2.value)
}

function subtract() {
    setResult(+inp1.value - +inp2.value)
}

function divide() {
    setResult(+inp1.value / +inp2.value)
}

function multiply() {
    setResult(+inp1.value * +inp2.value)
}

function pow() {
    setResult(Math.pow(+inp1.value, +inp2.value))
}

function sqrt() {
    setResult(Math.sqrt(+inp1.value))
}

function abs() {
    setResult(Math.abs(+inp1.value))
}

function rand() {

    let max = +inp1.value + 1;
    let min = +inp2.value;

    let rand = Math.floor(Math.random() * (max - min) + min)

    setResult(rand)
}

function round() {
    setResult(Math.round(+result.textContent))
}

function floor() {
    setResult(Math.floor(+result.textContent))
}

function ceil() {
    setResult(Math.ceil(+result.textContent))
}

function setResult(value) {
    result.textContent = value;
}

