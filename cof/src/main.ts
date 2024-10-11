import "./style.css";

let BatteryCharge: number = 0;
let maxCharge: number = 6;
// let isGameStarted = false;
// let puntoCaricamentoBatteria: number = 0;

const util = {
    isGameStarted: false,
    puntoCaricamentoBatteria: 0,
    minSn: 0,
    minDx: 0,
    secSn: 0,
    secDx: 0,
    id: 0,
    selectedTruppa: "",
    intervalTruppaSelez: 0,
    intervalSchieraTruppa: 0,
    selectedCell: "",
    cellColor: "",
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
        createTimer();
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

        ((box) => {
            box.addEventListener("click", () => {
                giveSelectedToBox(box);
            });
        })(box);

        showWeaponsInAside(box, i);
        aside.appendChild(box);
    }
}

function giveSelectedToBox(Selectedbox: HTMLElement) {
    const allBoxes = document.querySelectorAll(".styleAsideBox");
    allBoxes.forEach((box) => {
        box.classList.remove("selected");
    });
    Selectedbox.classList.add("selected");
    // !box.classList.contains("selected") ? box.classList.add("selected") : box.classList.remove("selected");
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
            nome.innerHTML = `🧬 Laser 🧬`;
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

        // cell.addEventListener("click", () => {
        //     selectCell(i);
        // });

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

function createTimer() {
    const messageBox = document.querySelector(".messagebox");
    const timer = document.createElement("div");
    timer.id = "timer";
    timer.classList.add("d-none");
    messageBox?.appendChild(timer);
}

function welcomeMessage() {
    const messageBox = document.querySelector(".messagebox");
    const startButton = document.createElement("button");
    startButton.classList.add("button");
    startButton.id = "mainBtn";
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
    //--------------------------------------------------------//
}

function changeStatusGame() {
    //richiamata quando il gioco parte
    if (!util.isGameStarted) {
        util.isGameStarted = true;
        reloadBattery();
        handleMessages();
        handleTimer();

        // controllo ogni secondo la truppa selezionata. (watching)
        // la funzione truppa selezionata ha il suo corrispettivo stopSelezioneTruppe quando viene messo in pausa
        // il gioco.
        util.intervalTruppaSelez = setInterval(() => {
            truppaSelezionata();
        }, 1000);

        // se selectedTruppa in util è popolato con il nome di una truppa
        // allora chiamo la funzione per schierare la truppa sul campo di battaglia
        //la fuzione schiera truppa ha la funzione corrispettiva stop schiera truppa per quando il gioco viene messo in pausa.
        util.intervalSchieraTruppa = setInterval(() => {
            util.selectedTruppa !== "" && schieraTruppa();
        }, 1000);

        console.log("gioco iniziato");
        return;
    }
    // richiamata quando il gioco in pausa
    if (util.isGameStarted) {
        util.isGameStarted = false;
        handleMessages();
        handleTimer();
        stopSelezioneTruppe();
        stopSchieraTruppa();
        console.log("gioco interrotto");
        return;
    }
}

// a seconda del valore inserito in util.selectedTruppa avvio una funzione che dovrà gestire il deploy del missile, del laser, del soldato.
function schieraTruppa() {
    console.log("sono dentro schiera truppa");
    switch (util.selectedTruppa) {
        case "Missle":
            deployMissile();
            break;
        case "Laser":
            deployLaser();
            break;
        case "soldato":
            deploySoldato();
            break;
    }
}

function deployMissile() {
    selectCell();

    // una serie di funzioni che descrivono la logica di selezione della casella e un modo per cambiare il colore delle caselle colpite dal missile.
}
function deployLaser() {}
function deploySoldato() {}

// funzioni comuni a tutte le armi per la selzione della casella cliccata.
function selectCell() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, i) => {
        cell.addEventListener("click", () => {
            util.selectedCell = `c${i}`;
            if (cell.classList.contains("red")) {
                util.cellColor = "red";
            }

            if (cell.classList.contains("blue")) {
                util.cellColor = "blue";
            }
        });
    });
}

function stopSchieraTruppa() {
    clearInterval(util.intervalSchieraTruppa);
    console.log("interrompi watch schiera truppa");
}

// salvo in util la stringa contenente la truppa che l'utente ha selezionato al momento
function truppaSelezionata() {
    // capisco quale truppa ha selezionato l'utente
    const boxSelezionato = document.querySelector(".selected");
    if (boxSelezionato) {
        let h4_NomeArma = boxSelezionato.querySelector(".stileNome");
        if (h4_NomeArma) {
            util.selectedTruppa = h4_NomeArma.innerHTML.slice(2, -2).trim();
            console.log(util);
        }
        //    let nomeWeapon = weapon?.innerHTML
        //     util.selectedArma = nomeWeapon?.slice
    } else {
        console.log("nessuna truppa selezionata.");
        return;
    }
    // se truppa seleziona è missile succederà qualcosa
}

// interrompo il looking sulla truppa selezionata.
function stopSelezioneTruppe() {
    console.log("non sto guardando alla truppa selezionata.");
    clearInterval(util.intervalTruppaSelez);
}

function reloadBattery() {
    let slots = document.querySelectorAll(".slot");
    let currentSlot = util.puntoCaricamentoBatteria;

    let interval = setInterval(() => {
        if (!util.isGameStarted) {
            util.puntoCaricamentoBatteria = currentSlot;
            clearInterval(interval);
            return;
        }

        if (currentSlot < slots.length) {
            console.log(currentSlot, "currslot");
            let slot = slots[currentSlot];
            slot.classList.add("fillSlot");
            currentSlot++;
            BatteryCharge < maxCharge ? BatteryCharge++ : null;
            console.log("carica batteria:", BatteryCharge);
        } else {
            clearInterval(interval);
        }
    }, 2000);
}

function handleMessages() {
    const welcomeText = document.querySelector(".welcome");
    const button = document.getElementById("mainBtn");
    if (welcomeText) {
        welcomeText.innerHTML = "default text";
    }

    if (!button) {
        return;
    }

    if (util.isGameStarted) {
        button.innerHTML = "STOP THE GAME 🖐";
    } else if (!util.isGameStarted) {
        button.innerHTML = "RESUME THE GAME 👍";
    }
}

function handleTimer() {
    const timer = document.getElementById("timer");

    if (timer) {
        timer.classList.remove("d-none");
        // se il gioco è avviato, avvia il timer, togli d-none al div
        util.isGameStarted && startClock(timer);
        // se il gioco è bloccato interrompi il timer
        !util.isGameStarted && stopClock();
    }
}

function startClock(timer: HTMLElement) {
    console.log("sono in start clock");
    util.id = setInterval(() => {
        if (util.secDx === 9 && util.secSn === 5 && util.minDx === 9 && util.minSn === 5) {
            clearInterval(util.id);
            timer.innerHTML = `${util.minSn}${util.minDx}:${util.secSn}${util.secDx}`;
        }

        util.secDx++;
        if (util.secDx > 9) {
            util.secSn++;
            util.secDx = 0;
        }

        if (util.secSn > 5) {
            util.minDx++;
            util.secSn = 0;
        }

        if (util.minDx > 9) {
            util.minSn++;
            util.minDx = 0;
        }

        timer.innerHTML = `${util.minSn}${util.minDx}:${util.secSn}${util.secDx}`;
    }, 1000);
    console.log("starting the clock...");
}

function stopClock() {
    console.log("sono in stop clock");
    clearInterval(util.id);
}
