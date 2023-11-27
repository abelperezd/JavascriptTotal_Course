let animalsList;

let animals = [];

//#region Animal classes

class Animal {
    constructor(name, weight, age) {
        this._name = name;
        this._weight = weight;
        this._age = age;

        animals.push(this);
    }

    getInformation() {
        return `${this._name} - ${this._weight}kg - ${this._age} years`
    }

    showMeOnScreen() {
        let item = document.createElement("li");
        item.textContent = this.getInformation();

        animalsList.appendChild(item)
    }
}

class Dog extends Animal {
    constructor(name, weight, age, race) {
        super(name, weight, age);
        this._race = race;
        this.showMeOnScreen();
    }

    getInformation() {
        return super.getInformation() + ` - ${this._race}`
    }
}

class Cat extends Animal {
    constructor(name, weight, age, sex) {
        super(name, weight, age);
        this._sex = sex;
        this.showMeOnScreen();
    }

    getInformation() {
        return super.getInformation() + ` - ${this._sex}`
    }
}

class Rabbit extends Animal {
    constructor(name, weight, age, color) {
        super(name, weight, age);
        this._color = color;
        this.showMeOnScreen();
    }

    getInformation() {
        return super.getInformation() + ` - ${this._color}`
    }
}

//#endregion

window.onload = function () {
    animalsList = document.getElementById("animalsList")
    createAnimals();
}

function createAnimals() {
    let dog1 = new Dog("Toby", 3, 4, "Chiguagua")
    let cat1 = new Cat("Katty", 2.5, 9, "Abyssinian", "female")
    let rabbit1 = new Rabbit("Jumpy", 4, 7, "gray")
}

