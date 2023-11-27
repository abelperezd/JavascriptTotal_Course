let marks = [];

let spanish;
let history;
let geography;
let maths;

window.onload = function () {
    spanish = document.getElementById("spanish");
    maths = document.getElementById("maths");
    geography = document.getElementById("geography");
    history = document.getElementById("history");

}

function compute() {
    marks = [];
    marks.push(+spanish.value);
    marks.push(+maths.value);
    marks.push(+geography.value);
    marks.push(+history.value);

    showMarks();
    computeAverage();
    computeMaxMark();
    isThereAnyFail();
}


function showMarks() {
    let list = document.getElementById("listScores");

    clearMakrs(list)

    for (let mark of marks) {
        let item = document.createElement("li");
        item.innerText = mark;
        list.appendChild(item);
    }
}

function clearMakrs(list) {
    var first = list.firstElementChild;
    while (first) {
        first.remove();
        first = list.firstElementChild;
    }
}

function computeAverage() {
    let sum = 0;

    for (i = 0; i < marks.length; i++) {
        sum += marks[i];
    }

    let avg = (sum / marks.length);
    document.getElementById("average").textContent = avg;
}

function computeMaxMark() {
    let bestMark = 0;
    let i = 0;
    while (i < marks.length - 1) {
        if (marks[i] > bestMark) {
            bestMark = marks[i];
        }
        i++;
    }
    document.getElementById("bestMark").textContent = bestMark;
}

function isThereAnyFail() {
    let failed = "No";
    let i = 0;
    do {
        if (marks[i] < 5) {
            failed = "Yes";
            break;
        }
        i++;
    } while (i < 5);
    document.getElementById("failed").textContent = failed;
}