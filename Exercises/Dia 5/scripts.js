let age;
let genre;
let result;

window.onload = function () {
    age = document.getElementById("age");
    genre = document.getElementById("genre");
    result = document.getElementById("result");
}

function getFilm() {
    let age_ = age.value;
    switch (genre.value) {
        case ('musical'):
            if (age_ < 13)
                setResult("La La Land")
            else if (age_ >= 13 && age_ < 18)
                setResult("Les Miserables")
            else if (age_ >= 18)
                setResult("The Rocky Horror Picture Show")
            break;

        case ('drama'):
            if (age_ < 13)
                setResult("Casablanca")
            else if (age_ >= 13 && age_ < 18)
                setResult("The Shawshank Redemption")
            else if (age_ >= 18)
                setResult("Taxi Driver")
            break;

        case ('comedy'):
            if (age_ < 13)
                setResult("Back to the Future")
            else if (age_ >= 13 && age_ < 18)
                setResult("The Truman Show")
            else if (age_ >= 18)
                setResult("The Wolf of Wall Street")
            break;

        case ('crime'):
            if (age_ < 13)
                setResult("Not found")
            else if (age_ >= 13 && age_ < 18)
                setResult("El Secreto de tus Ojos")
            else if (age_ >= 18)
                setResult("The Godfather")
            break;
    }
}

function setResult(value) {
    result.textContent = value;
}

