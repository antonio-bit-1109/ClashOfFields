import "./style.css";

let BatteryCharge: number = 0;
let maxCharge: number = 6;
// let isGameStarted = false;
// let puntoCaricamentoBatteria: number = 0;

const util = {
    isGameStarted: false,
    puntoCaricamentoBatteria: 0,
};

document.addEventListener("DOMContentLoaded", () => {
    // creo la griglia di gioco e la preparo con classi e compagnia bella.
    const main = document.getElementById("main");
    if (main) {
        // creo campo da gioco e menù laterale
        createAside(main);
        createGriglia(main);
        createBatteryContainer(main);
        createMessagesContainer(main);
        welcomeMessage();
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

function showWeaponsInAside(box: HTMLElement, i: number) {
    const vetrina = document.createElement("div");
    vetrina.classList.add(`vetrina`);
    const nome = document.createElement("h4");
    nome.classList.add("stileNome");
    vetrina.appendChild(nome);
    switch (i) {
        case 0:
            nome.innerHTML = `🚀 Missle 🚀`;
            createWepon(vetrina, "./imgs/missle.png");
            weaponCost(vetrina, 2);
            break;
        case 1:
            nome.innerHTML = ` 🧬 Laser 🧬 `;
            createWepon(vetrina, "./imgs/laser.png");
            weaponCost(vetrina, 2);
            break;
        case 2:
            nome.innerHTML = `⚔ soldato ⚔`;
            createWepon(vetrina, "./imgs/solder.png");
            weaponCost(vetrina, 4);
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

function createWepon(vetrina: HTMLElement, path: string) {
    const weapon: HTMLImageElement = document.createElement("img");
    weapon.src = path;
    weapon.classList.add("imgCompact");
    vetrina.appendChild(weapon);
}

function weaponCost(vetrina: HTMLElement, batteryCost: number) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapperBatteryCost");
    for (let i = 0; i < batteryCost; i++) {
        const box = document.createElement("div");
        box.classList.add("batteryCost");
        // vetrina.appendChild(box);
        wrapper.appendChild(box);
    }
    vetrina.appendChild(wrapper);
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

function createMessagesContainer(main: HTMLElement) {
    const messageBox = document.createElement("section");
    messageBox.classList.add("messagebox");
    main.appendChild(messageBox);
}

function welcomeMessage() {
    const messageBox = document.querySelector(".messagebox");
    const startButton = document.createElement("button");
    startButton.classList.add("button");
    startButton.innerHTML = "iniziamo!";
    const welcome = document.createElement("h4");
    welcome.classList.add("h4Style");
    welcome.classList.add("welcome");
    welcome.innerHTML =
        "benvenuto al mio gioco di controlla il campo di battaglia! Spero funzioni... sei pronto per partire ? ";

    messageBox?.appendChild(welcome);
    messageBox?.appendChild(startButton);

    // PUNTO PARTENZA PER GESTIRE AVVIO/STOP DEL GIOCO
    startButton.addEventListener("click", changeStatusGame);
}

function changeStatusGame() {
    if (!util.isGameStarted) {
        util.isGameStarted = true;
        reloadBattery();
        console.log("gioco iniziato");
        return;
    }

    if (util.isGameStarted) {
        util.isGameStarted = false;
        console.log("gioco interrotto");
        return;
    }

    startTimer();
}

function reloadBattery() {
    let slots = document.querySelectorAll(".slot");
    let currentSlot = util.puntoCaricamentoBatteria; // Usa puntoCaricamentoBatteria o parte da 0

    let interval = setInterval(() => {
        if (!util.isGameStarted) {
            util.puntoCaricamentoBatteria = currentSlot;
            clearInterval(interval);
            return;
        }

        if (currentSlot < slots.length) {
            console.log(currentSlot, "currslot");
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

function startTimer() {
    const welcomeMessage = document.querySelector(".welcome");
    welcomeMessage?.classList.add("d-none");
}
