//https://dev.to/collegewap/how-to-call-asyncawait-functions-in-parallel-5h73

/*
https://api.coindesk.com/v1/bpi/currentprice.json
https://open.er-api.com/v6/latest/USD
https://open.er-api.com/v6/latest/ARS
*/

//#region Elements
let loading = document.getElementById("loadingIcon");
let logo = document.getElementById("logo");
let title = document.getElementById("title");
let currencies = document.getElementById("currencies");
//#endregion

//#region Promises

let loadLogo = new Promise((resolve, reject) => {
    var newImg = new Image;
    newImg.onload = function () {
        logo.src = this.src;
        resolve(this.src);
    }
    newImg.onerror = function () {
        console.log("image not loaded");
        reject("Image not found: " + newImg.src)
    }
    newImg.src = 'resources/logo.jpg';
    title.textContent = "Dollar exchanges"
})

let getBitcoin = new Promise((resolve, reject) => {

    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(res => res.json())
        .then(jsonRes => resolve(jsonRes))
        .catch(error => reject(error))
})

let getUsd = new Promise((resolve, reject) => {

    fetch("https://open.er-api.com/v6/latest/USD")
        .then(res => res.json())
        .then(jsonRes => resolve(jsonRes))
        .catch(error => reject(error))
})

let getArs = new Promise((resolve, reject) => {

    fetch("https://open.er-api.com/v6/latest/ARS")
        .then(res => res.json())
        .then(jsonRes => resolve(jsonRes))
        .catch(error => reject(error))
})

//#endregion

loadContent();

loadApiContent();

async function loadContent() {
    await Promise.all([loadLogo])
        .then(result => {
            logo.src = result;
            logo.style.visibility = "visible";
        })
        .catch(error => console.log(error))
}

async function loadApiContent() {
    console.log("Delay result:" + await setLoadingDelay(2000))

    //result: 0 -> bitcoin / 1 -> USD / 2 -> ARS
    await Promise.all([getBitcoin, getUsd, getArs]).then(result => {
        loading.remove();
        logo.style.visibility = "visible";
        console.log(result);
        manageApiResult(result);
    })
}

function manageApiResult(result) {
    createCurrencyElements("Bitcoin", result[0].bpi.USD.rate);
    createCurrencyElements("Eur", result[1].rates.EUR);
    createCurrencyElements("ARS", result[2].rates.EUR);
}

function createCurrencyElements(currency, amount) {
    let div = document.createElement("div");

    let p = document.createElement("p");
    p.textContent = currency + ": ";
    p.className = "currency";

    let span = document.createElement("span");
    span.textContent = "$" + amount;
    span.className = "amount";

    p.appendChild(span);

    div.appendChild(p);

    currencies.appendChild(div);

}

async function setLoadingDelay(sec) {
    return new Promise((resolve) => {
        setTimeout(resolve, sec);
    })
}
