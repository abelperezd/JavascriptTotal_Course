let animalsList;

let animals = [];


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
    uploadContent();
}

function uploadContent() {
    //the second then is not for fetch but for res.json!
    fetch("bankAccount.json")
        .then(res => res.json())
        .then(jsonRes => {
            document.getElementById("bank").textContent = jsonRes.bank;
            document.getElementById("office").textContent = jsonRes.office;
            document.getElementById("owner").textContent = jsonRes.owner;
            document.getElementById("acc_number").textContent = jsonRes.acc_number;

            document.getElementById("usd").textContent = "$" + jsonRes.balance
                .find(item => item.currency === "USD").amount;

            document.getElementById("eur").textContent = jsonRes.balance
                .find(item => item.currency === "EUR").amount + "€";

            document.getElementById("creation_date").textContent = jsonRes.creation_date;

        })
        .catch(ex => console.log(ex)
        );
}
