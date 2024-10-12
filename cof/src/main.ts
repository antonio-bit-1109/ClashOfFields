import "./style.css";
import { createAside } from "./createAside";
import { createGriglia } from "./createGriglia";
import { createBatteryContainer } from "./createBatteryContainer";
import { createMessagesContainer } from "./createMessagesContainer";
import { createTimer } from "./createTimer";

let BatteryCharge: number = 0;
let maxCharge: number = 6;
// let isGameStarted = false;
// let puntoCaricamentoBatteria: number = 0;
interface IUtil {
    isGameStarted: boolean;
    puntoCaricamentoBatteria: number;
    minSn: number;
    minDx: number;
    secSn: number;
    secDx: number;
    id: number;
    selectedTruppa: string;
    intervalTruppaSelez: number;
    intervalSchieraTruppa: number;
    selectedCell: string;
    cellColor: string;
    isPlayerOneTurn: boolean;
    raggioAzioneMissile: string[];
}

const util: IUtil = {
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
    isPlayerOneTurn: true,
    raggioAzioneMissile: [],
};

document.addEventListener("DOMContentLoaded", () => {
    // creo la griglia di gioco e la preparo con classi e compagnia bella.
    const main = document.getElementById("main");
    if (main) {
        // creo campo da gioco e menù laterale - script a parte
        // crea div laterale
        createAside(main);
        // crea griglia centrale
        createGriglia(main);
        // crea contenitore batteria
        createBatteryContainer(main);
        // crea div per messaggi di servizio
        createMessagesContainer(main);
        // creazione timer
        createTimer();

        // funzione principale. -- avvio del gioco.
        welcomeMessage();
    }
});

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
        "Benvenuto a sto gioco di controlla il campo di battaglia! Spero funzioni... sei pronto per partire ? ";

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

async function deployMissile() {
    // una serie di funzioni che descrivono la logica di selezione della casella e un modo per cambiare il colore delle caselle colpite dal missile.
    await selectCell();
    deployOnBattleField();
}

function deployLaser() {}
function deploySoldato() {}

// -------------------------------funzioni comuni armi per logica di deploy ---------------------------------------------
// funzioni comuni a tutte le armi per la selzione della casella cliccata.
async function selectCell(): Promise<string> {
    return new Promise((res) => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, i) => {
            cell.addEventListener("click", () => {
                util.selectedCell = `c${i}`;
                if (cell.classList.contains("red")) {
                    util.cellColor = "red";
                    res(util.cellColor);
                }

                if (cell.classList.contains("blue")) {
                    util.cellColor = "blue";
                    res(util.cellColor);
                }
            });
        });
    });
}

// salvo in util la cella cliccata e se il colore è blue o rosso
function deployOnBattleField() {
    if (util.isPlayerOneTurn) {
        // gioco tenendo in considerazione che il campo di battaglia diventa blue
        deploy("blue");
        util.isPlayerOneTurn = false;
    }

    if (!util.isPlayerOneTurn) {
        // gioco tenendo in considerazione che il campo di battaglia diventa rosso
        deploy("red");
        util.isPlayerOneTurn = true;
    }
}

function deploy(cellColor: string) {
    // pulisco array ogni qual volta voglio fare il deploy di un missile
    util.raggioAzioneMissile.length = 0;
    // pusho in array tutte le stringhe , che corrispondono alle classi delle celle, su cui voglio che il missile abbia un raggio d'azione.
    util.raggioAzioneMissile.push(
        "c" + (parseInt(util.selectedCell.slice(1)) + 0).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 1).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 2).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 3).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 4).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 1).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 2).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 3).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 4).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 40).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 41).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 42).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 43).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 44).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 45).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 46).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 40).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 41).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 42).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 43).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 44).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 45).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 46).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 84).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 85).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 86).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 87).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 88).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 84).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 85).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 86).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 87).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 88).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 130).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 129).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 128).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 130).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 129).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 128).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) + 172).toString(),
        "c" + (parseInt(util.selectedCell.slice(1)) - 172).toString()
    );
    console.log(util);
    util.raggioAzioneMissile.forEach((val) => {
        let cell = document.querySelector(`.${val}`);
        cell?.classList.add(cellColor);
    });
}
// -----------------------------------------------------------------------------------------------------------------------------------------------------------
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
