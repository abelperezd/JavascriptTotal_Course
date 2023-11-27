let carsList;

let cars = [];

function Car(brand, model, color, year, owner) {
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.year = year;
    this.owner = owner;
}

window.onload = function () {
    carsList = document.getElementById("carsList")
    addCarMethods()
}

function addCarMethods() {
    Car.prototype.sellCar = function (owner) {
        this.owner = owner;
        seeAllCars();
    }

    Car.prototype.addCar = function () {
        let item = document.createElement("li");
        item.textContent = `${this.brand} ${this.model} - ${this.year} - ${this.owner}`

        carsList.appendChild(item)
    }

    Car.prototype.showCar = function () {
        alert(`${this.brand} ${this.model} - ${this.year} - ${this.owner}`)
    }

    Car.prototype.start = function () {
        alert(`${this.brand} ${this.model} started!`)
    }
}

//TODO: check if fields have valid values
function addCar(brand, model, color, year, owner) {
    let car = new Car(brand, model, color, year, owner)
    cars.push(car)
    seeAllCars();
    alert("Car added properly");
    return car;
}


function seeAllCars() {
    clearCarsList();

    cars.forEach(element => {
        element.addCar();
    });
}

function clearCarsList() {
    while (carsList.childElementCount > 0) {
        carsList.firstElementChild.remove();
    }
}

