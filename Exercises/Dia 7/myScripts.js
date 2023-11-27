const minShopSellVal = 0

function createShops(containerId, shopAmount) {
    //get container by id
    let elementContainer = document.getElementById(containerId);

    //loop para crear tantas tiendas como se pidan
    for (let i = 0; i < shopAmount; i++) {

        //create new shop element
        let parrafoTienda = createNewShop("Shop " + (i + 1));

        //agregar el parrafo al contenedor
        elementContainer.appendChild(parrafoTienda);
    }
}

function createNewShop(labelText) {
    let p = document.createElement("p");

    let label = document.createElement("label");
    label.innerText = labelText + ": ";
    label.setAttribute("for", labelText);

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", labelText);
    input.setAttribute("min", minShopSellVal);
    input.setAttribute("value", 0);

    p.appendChild(label);
    p.appendChild(input);

    return p;
}

function getSellNumberFromElement(element) {
    return Number(element.value);
}

function compute() {
    let sells = [];
    let shopItems = document.getElementById("shopItems");

    for (let item of shopItems.children) {
        let sellValue = getSellNumberFromElement(item.children[1]);
        sells.push(sellValue);
    }

    let sellAmount = computeTotalSells(sells);

    //let maxSell = computeMax(sells);
    //let minSell = computeMin(sells);


    let outputElement = document.getElementById("output");

    setBestAndWorstShops();

    outputElement.textContent = "Total sells: " + sellAmount;
}

function setBestAndWorstShops() {
    let worstShops = []
    let bestShops = []

    let shopItems = document.getElementById("shopItems");

    if (shopItems.childElementCount < 2)
        return;

    let shopItemsChildren = shopItems.children

    for (let item of shopItemsChildren) {

        let input = item.getElementsByTagName("input")[0]

        let sellPrice = Number(input.value)
        //if it is the first element...
        if (worstShops.length == 0) {
            worstShops.push(input)
            bestShops.push(input)
            continue
        }

        if (sellPrice == (Number)(worstShops[0].value)) {
            worstShops.push(input)
        }
        if (sellPrice < (Number)(worstShops[0].value)) {
            worstShops = []
            worstShops.push(input)
        }
        if (sellPrice == (Number)(bestShops[0].value)) {
            bestShops.push(input)
        }
        if (sellPrice > (Number)(bestShops[0].value)) {
            bestShops = []
            bestShops.push(input)
        }
    }
    bestShops.forEach(item => {
        item.className = "bestSell" // 
    });
    worstShops.forEach(item => {
        item.setAttribute("class", "worstSell")
    });

    Array.from(shopItemsChildren).forEach(item => {
        let input = item.getElementsByTagName("input")[0]
        if (!(bestShops.includes(input) || worstShops.includes(input)))
            input.removeAttribute("class")
    });

}

function computeTotalSells(array) {
    let total = 0;

    for (let sells of array) {
        total = total + sells;
    }
    return total;
}

function computeMax(array) {
    let max = array[0];

    for (let venta of array) {
        if (venta > max) {
            max = venta;
        }
    }

    return max;
}

function computeMin(array) {
    let min = array[0];

    for (let venta of array) {
        if (venta < min) {
            min = venta;
        }
    }

    return min;
}