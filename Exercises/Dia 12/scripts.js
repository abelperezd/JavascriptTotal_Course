let category = document.getElementById("category");
let items = document.getElementById("items");
let btn = document.getElementById("btn");
let inp = document.getElementById("inp");
let synopsisElement = document.getElementById("synopsis");

let file;
//to save the synopsis of each film/series
let synopsisDict = {};

//to avoid showing the alert the firs time
let showAlert = false;

category.addEventListener("change", onCategoryChanged);
items.addEventListener("categoryChanged", loadRecommendations);
inp.addEventListener("keydown", onInputKeyDown)
btn.addEventListener("click", loadRecommendations)

//initialize the list for the first time.
onCategoryChanged();

function onCategoryChanged() {

    if (!showAlert)
        showAlert = true;
    else
        alert("Category selected: " + category.options[category.selectedIndex].text)

    if (category.value == "films")
        filePath = "resources/films.json";
    else
        filePath = "resources/series.json";

    inp.value = "";

    fetch(filePath)
        .then(res => res.json())
        .then(jsonRes => {
            file = jsonRes;
            let event = new CustomEvent("categoryChanged");
            items.dispatchEvent(event)
        })
        .catch(ex => console.log(ex)
        );
}

function loadRecommendations() {
    removeItems();
    file.data.forEach(element => {
        //find all the coincidences with the input and add them.
        if (inp.value.lenght == 0 || element.name.toLowerCase().includes(inp.value.toLowerCase())) {
            let item = document.createElement("li");
            item.innerText = element.name;
            items.appendChild(item);
            item.addEventListener("mouseover", displaySynopsis)
            item.addEventListener("mouseout", hideSynopsis)
            item.className = "item";

            /*
            let synopsis = document.createElement("p");
            synopsis.innerText = element.synopsis;
            synopsis.style.display = "none"
            item.appendChild(synopsis);
            */
            synopsisDict[element.name] = element.synopsis;
        }
    });
}

function removeItems() {
    while (items.childElementCount > 0) {
        items.firstElementChild.remove();
    }
    synopsisDict = {}
}

function onInputKeyDown(event) {
    if ((event.keyCode < 65 || event.keyCode > 90) && event.keyCode != 32 && event.keyCode != 8 && event.keyCode != 13) {
        event.preventDefault();
        return;
    }
    //enter button to search
    if (event.keyCode == 13) {
        let event = new CustomEvent("click");
        btn.dispatchEvent(event)
    }
}

function displaySynopsis(event) {
    //previously it had a child. This avoided to throw an error
    if (event.currentTarget !== event.target) {
        return;
    }

    synopsisElement.style.display = "block";
    synopsisElement.textContent = synopsisDict[event.target.innerText]

    /*
    let p = event.target.getElementsByTagName('p')[0];
    p.style.display = "block"
    */
}

function hideSynopsis(event) {
    if (event.currentTarget !== event.target) {
        return;
    }

    synopsisElement.style.display = "none";
    synopsisElement.textContent = ""
    /*
    let p = event.target.getElementsByTagName('p')[0];
    p.style.display = "none"
    */
}