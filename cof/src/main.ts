import "./style.css";

let BatteryCharge: number = 0;
let maxCharge: number = 6;
document.addEventListener("DOMContentLoaded", () => {
    // creo la griglia di gioco e la preparo con classi e compagnia bella.
    const main = document.getElementById("main");
    if (main) {
        // creo campo da gioco e menù laterale
        createAside(main);
        createGriglia(main);
        createBatteryContainer(main);
        reloadBattery();
    }
});

// crea il menu verticale dal quale si potrà scegliere arma
function createAside(main: HTMLElement) {
    const aside = document.createElement("aside");
    main.appendChild(aside);
    aside.classList.add("aside");
    createBoxes(aside);
}

// crea i 4 boxes che conterranno le 4 armi disponibili
function createBoxes(aside: HTMLElement) {
    let box: any;
    for (let i = 0; i < 4; i++) {
        box = document.createElement("div");
        box.classList.add("styleAsideBox");
        showWeaponsInAside(box, i);
        aside.appendChild(box);
    }
}

// crea la griglia contenente tutte le celle necessarie al gioco
function createGriglia(main: HTMLElement) {
    const cellContainer = document.createElement("div");
    cellContainer.classList.add("cellsContainers");
    for (let i = 0; i < 1978; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add(`c${i}`);

        if (i < 989) {
            cell.classList.add("red");
        } else {
            cell.classList.add("blue");
        }

        cellContainer.appendChild(cell);
    }
    main.appendChild(cellContainer);
}

function showWeaponsInAside(box: HTMLElement, i: number) {
    const vetrina = document.createElement("div");
    vetrina.classList.add(`vetrina`);
    const nome = document.createElement("h4");
    nome.classList.add("stileNome");
    vetrina.appendChild(nome);
    switch (i) {
        case 0:
            nome.innerHTML = `🚀 Missle 🚀`;
            createRocket(vetrina);
            break;
        case 1:
            nome.innerHTML = ` arma2 `;
            break;
        case 2:
            nome.innerHTML = ` arma3 `;
            break;
        case 3:
            nome.innerHTML = ` arma4 `;
            break;

        default:
            null;
            break;
    }

    box.appendChild(vetrina);
}

function createRocket(vetrina: HTMLElement) {
    const rocket = document.createElement("img");
    rocket.src = "./imgs/missle.jpg";
    rocket.classList.add("imgCompact");
    vetrina.appendChild(rocket);
}

function createBatteryContainer(main: HTMLElement) {
    const batteryContainer = document.createElement("div");
    batteryContainer.classList.add("batteryContainer");
    createSlotBattery(batteryContainer);
    main.appendChild(batteryContainer);
}

function createSlotBattery(batteryContainer: HTMLElement) {
    let slot: any;
    for (let i = 0; i < 6; i++) {
        slot = document.createElement("div");
        slot.classList.add("styleSlot");
        slot.classList.add("slot");
        batteryContainer.appendChild(slot);
    }
}

function reloadBattery() {
    let slots = document.querySelectorAll(".slot");
    let currentSlot = 0; // Contatore per gli slot già riempiti

    let interval = setInterval(() => {
        if (currentSlot < slots.length) {
            let slot = slots[currentSlot]; // Seleziona lo slot corrente
            slot.classList.add("fillSlot"); // Aggiungi la classe solo a questo slot
            currentSlot++; // Passa allo slot successivo
            BatteryCharge < maxCharge ? BatteryCharge++ : null;
            console.log("carica batteria:", BatteryCharge);
        } else {
            clearInterval(interval); // Ferma l'interval una volta che tutti gli slot sono pieni
        }
    }, 2000); // Ogni 2 secondi
}
