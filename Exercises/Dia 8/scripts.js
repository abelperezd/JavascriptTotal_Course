let _id;
let _age;
let _name;
let _surname;
let _birthday;
let _position;
let _workersList;

let workers = [];

class worker {
    constructor(id, age, name, surname, birthday, position) {
        this.id = id;
        this.age = age;
        this.name = name;
        this.surname = surname;
        this.birthday = birthday;
        this.position = position;
    }
}

window.onload = function () {
    _id = document.getElementById("id");
    _age = document.getElementById("age");
    _name = document.getElementById("name");
    _surname = document.getElementById("surname");
    _position = document.getElementById("position");
    _birthday = document.getElementById("birthday");
    _workersList = document.getElementById("workersList")
}

//TODO: check if fields have valid values
function addWorker() {
    workers.push(new worker(_id.value, _age.value, _name.value, _surname.value, _birthday.value, _position.options[_position.selectedIndex].textContent))
    resetFields();
    seeAllWorkers();
    alert("Worker added properly");
}

function resetFields() {

    let elements = document.getElementsByTagName("input");
    document.getElementsByTagName("select")[0].value = "pm";
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = "";
    }
}

function setResult(value) {
    result.textContent = value;
}

function seeAllWorkers() {
    clearWorkersList();

    workers.forEach(element => {
        let item = document.createElement("li");
        item.textContent = `${element.name} ${element.surname}`

        let ul = document.createElement("ul");
        item.appendChild(ul);


        let idItem = document.createElement("li");
        idItem.textContent = "Id: " + element.id;

        let ageItem = document.createElement("li");
        ageItem.textContent = "Age: " + element.age;

        let birthdayItem = document.createElement("li");
        birthdayItem.textContent = "Birthday: " + element.birthday;

        let positionItem = document.createElement("li");
        positionItem.textContent = "Position: " + element.position;

        ul.appendChild(idItem);
        ul.appendChild(ageItem);
        ul.appendChild(birthdayItem);
        ul.appendChild(positionItem);

        _workersList.appendChild(item);

    });
}

function clearWorkersList() {
    _workersList.firstElementChild;
    while (_workersList.childElementCount > 0) {
        _workersList.firstElementChild.remove();
    }
}

