let table;

let mId;
let mBrand;
let mModel;
let mColor;
let mMemory;
let mProcessor;


let aId;
let aBrand;
let aModel;
let aColor;
let aMemory;
let aProcessor;

window.onload = function () {
    table = document.getElementById("rowContainer");
    document.getElementById("searchBtn").onclick = getSinglePhone;
    document.getElementById("modifyBtn").onclick = modifyPhone;
    document.getElementById("deleteBtn").onclick = deletePhone;
    document.getElementById("addBtn").onclick = addPhone;

    mId = document.getElementById("mId")
    mBrand = document.getElementById("mBrand")
    mModel = document.getElementById("mModel")
    mColor = document.getElementById("mColor")
    mMemory = document.getElementById("mMemory")
    mProcessor = document.getElementById("mProcessor")

    aId = document.getElementById("aId")
    aBrand = document.getElementById("aBrand")
    aModel = document.getElementById("aModel")
    aColor = document.getElementById("aColor")
    aMemory = document.getElementById("aMemory")
    aProcessor = document.getElementById("aProcessor")

    getContentFromApi();
}

async function getContentFromApi() {
    let req = await fetch("https://my-json-server.typicode.com/fedegaray/telefonos/db")
    if (!req.ok) {
        console.log("Get data error: " + req.statusText)
        return;
    }

    let data = await req.json();

    console.log(data.dispositivos);

    generateElements(data.dispositivos);
}

function generateElements(data) {

    let outp = ""

    for (let element of data) {
        outp += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.marca}</td>
                    <td>${element.modelo}</td>
                    <td>${element.color}</td>
                    <td>${element.almacenamiento}</td>
                    <td>${element.procesador}</td>
                </tr>
            `;
    }
    table.innerHTML = outp;
}

async function getSinglePhone() {
    if (mId.value.length == 0)
        return;

    let req = await fetch(`https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/${mId.value}`)
    if (!req.ok) {
        console.log("Get data error: " + req.statusText)
        return;
    }

    let data = await req.json();

    console.log(data);

    mBrand.value = data.marca;
    mModel.value = data.modelo;
    mColor.value = data.color;
    mMemory.value = data.almacenamiento;
    mProcessor.value = data.procesador;

}

async function modifyPhone() {
    try {

        if (mId.value.length == 0)
            return;
        //TODO: check empty fields

        fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + mId.value, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                marca: mBrand.value,
                modelo: mModel.value,
                color: mColor.value,
                almacenamiento: mMemory.value,
                procesador: mProcessor.value
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(`Phone with id: ${mId.value} was modified. New content:\n${JSON.stringify(data)}`);

                //TODO: update devices on screen.
            })
            .catch(error => { throw new Error("Request error: " + error) })
    } catch (error) {
        console.error(error)
    }
}

async function deletePhone() {

    if (mId.value.length == 0)
        return;

    let req = await fetch(`https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/${mId.value}`, {
        method: 'DELETE',
    })

    if (!req.ok) {
        console.log("Delete data error: " + req.statusText)
        alert("Error on delete: " + mId.value)
        return;
    }

    alert(`Device with id '${mId.value}' deleted.`)
    clearModifyValues();

    //TODO: remove element from html


}

async function addPhone() {
    try {
        //TODO: check empty fields
        fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            //The id should be set by the server
            body: JSON.stringify({
                marca: aBrand.value,
                modelo: aModel.value,
                color: aColor.value,
                almacenamiento: aMemory.value,
                procesador: aProcessor.value
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(`New device added:\nBrand: ${data.marca}\nModel: ${data.modelo}\nColor: 
                ${data.color}\nMemory: ${data.almacenamiento}\nProcessor: ${data.procesador}`);
                //TODO: update html content.
            })
            .catch(error => { throw new Error("Error in request: " + error) })
    } catch (error) {
        console.error(error)
    }
}

function clearModifyValues() {
    mId.value = "";
    mBrand.value = "";
    mModel.value = "";
    mColor.value = "";
    mMemory.value = "";
    mProcessor.value = "";
}