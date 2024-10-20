import "./style.css";
import { createAside } from "./CREATEDOM/createAside";
import { createGriglia } from "./CREATEDOM/createGriglia";
import { createBatteryContainer } from "./CREATEDOM/createBatteryContainer";
import { createMessagesContainer } from "./CREATEDOM/createMessagesContainer";
import { createTimer } from "./CREATEDOM/createTimer";
import { giveWarningMessage } from "./HANDLEMESSAGES/warningMessage";
import { Patch_removePacMan_Effect } from "./PATCH/removePacManEffect";
import { consumaCaricaBatteria } from "./HANDLEBATTERY/consumaCaricaBatteria";
import { ricaricaBatteria } from "./HANDLEBATTERY/ricaricaBatteria";
import { giveMessage } from "./HANDLEMESSAGES/giveMessage";
import { handleTimer } from "./HANDLETIME/handleTimer";
import { handleMessages } from "./HANDLEMESSAGES/handleMessages";
import { deployRaggioAzioneMissile } from "./DEPLOYWEAPON/deployRaggioAzioneMissile";
import { handleVeloGriglia } from "./HANDLEGAME/addVeloGrigliaGiocoPausa";
import { deployRaggioAzioneLaser } from "./DEPLOYWEAPON/deployRaggioAzioneLaser";

//import { stopClock } from "./HANDLETIME/stopClock";
//import { riavviaPartita } from "./HANDLEGAME/riavviaPartita";

// suoni-audio
const missleExplSound = new Audio("../sounds/missleExpl.mp3");
const laserZapSound = new Audio("../sounds/laser_zap.mp3");
const sottofondoMusic = new Audio("../sounds/sottofondo.mp3");

// export let BatteryCharge: number = 0;
// let maxCharge: number = 6;

// interfaccia
interface IUtil {
    BatteryCharge: number;
    isGameStarted: boolean;
    primoAvvio: boolean;
    puntoCaricamentoBatteria: number;
    minSn: number;
    minDx: number;
    secSn: number;
    secDx: number;
    id: number;
    selectedTruppa: string;
    intervalTruppaSelez: number;
    intervalSchieraTruppa: number;
    intervalRicaricaBatteria: number;
    refAvanzamentoLaser: string;
    selectedCell: string;
    cellColor: string;
    raggioAzioneArma: string[];
    corpoArma: string[];
    hoMessoPausaAlmenoUnaVolta: boolean;
    redCells: number;
    blueCell: number;
}

// oggetto contenente alcune variabili blobali
export const util: IUtil = {
    BatteryCharge: 0,
    isGameStarted: false,
    primoAvvio: true,
    puntoCaricamentoBatteria: 0,
    minSn: 0,
    minDx: 0,
    secSn: 4,
    secDx: 5,
    id: 0,
    selectedTruppa: "",
    intervalTruppaSelez: 0,
    intervalSchieraTruppa: 0,
    intervalRicaricaBatteria: 0,
    refAvanzamentoLaser: "",
    selectedCell: "",
    cellColor: "",
    raggioAzioneArma: [],
    corpoArma: [],
    hoMessoPausaAlmenoUnaVolta: false,
    redCells: 0,
    blueCell: 0,
};

document.addEventListener("DOMContentLoaded", () => {
    // creo la griglia di gioco e la preparo con classi e compagnia bella. FUNZIONI SINCRONE
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

function startBackgroundMusic() {
    sottofondoMusic.play();
    sottofondoMusic.volume = 0.0;
}

function welcomeMessage() {
    const messageBox = document.querySelector(".messagebox");
    const startButton = document.createElement("button");
    const logo = document.createElement("img");
    const warningMessage = document.createElement("p");
    warningMessage.classList.add("warning");
    logo.src = "../imgs/logo.webp";
    logo.classList.add("stileLogo");
    startButton.classList.add("button");
    startButton.classList.add("pointer");
    startButton.id = "mainBtn";
    startButton.innerHTML = "iniziamo!";
    const welcome = document.createElement("h4");
    welcome.classList.add("h4Style");
    welcome.classList.add("welcome");
    welcome.innerHTML =
        "Benvenuto su <span style='color:red'> Clash </span> of  <span style='color:blue'> Fields! </span> <br> Facciamo una partita!";

    messageBox?.appendChild(logo);
    messageBox?.appendChild(welcome);
    messageBox?.appendChild(warningMessage);
    messageBox?.appendChild(startButton);

    // PUNTO PARTENZA PER GESTIRE AVVIO/STOP DEL GIOCO
    startButton.addEventListener("click", changeStatusGame);
    //--------------------------------------------------------//
}

// punto di ingresso.
function changeStatusGame() {
    // avvio musica di sottofondo
    startBackgroundMusic();

    //richiamata quando il gioco parte
    if (!util.isGameStarted) {
        util.primoAvvio = false;
        util.isGameStarted = true;
        handleVeloGriglia();
        ricaricaBatteria();
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
        handleVeloGriglia();
        console.log("gioco interrotto");
        return;
    }
}

// a seconda del valore inserito in util.selectedTruppa avvio una funzione che dovrà gestire il deploy del missile, del laser, del soldato.
// deployWeapon è una funzione parametrica che accetta argomenti differenti a seconda dell'arma da daployare.
// FUNZIONI EXTRA COME ARGOMENTI DI DEPLOYwEAPON : PATCH PER RIMUOVERE EFFETTO PACMAN SULLE CELLE.
function schieraTruppa() {
    console.log("sono dentro schiera truppa");
    switch (util.selectedTruppa) {
        case "Missle":
            deployWeapon(3, missleExplSound, deployRaggioAzioneMissile, Patch_removePacMan_Effect);
            giveMessage(`Hai selezionato  <span style='color:red;font-size:1.5em;'>'Missile'</span>`);
            break;
        case "Laser":
            deployWeapon(2, laserZapSound, deployRaggioAzioneLaser);
            giveMessage(`Hai selezionato  <span style='color:red;font-size:1.5em;'>'Laser'</span>`);
            break;
        case "Soldato":
            deployWeapon(4);
            giveMessage(`Hai selezionato  <span style='color:red;font-size:1.5em;'>'Soldato'</span>`);
            break;
        case "Martello":
            deployWeapon(3);
            giveMessage(`Hai selezionato  <span style='color:red;font-size:1.5em;'>'Martello'</span>`);
    }
}

// funzione per sentire audio dell arma che entra in campo.
async function suonoImpattoArma(audioElement: HTMLAudioElement) {
    if (audioElement.currentTime > 0) {
        audioElement.currentTime = 0;
        audioElement.play();
    } else {
        audioElement.play();
    }
}

// ogni funzione "deployWeapon" accetta un numero he rappresenta il costo arma , un elemento audio del suono che dovrà generare quell'arma e una funzione che descrive la logica di visualizzazione dell'effetto a schermo dell arma che viene sganciata.
// i alcuni caso sono fornite funzioni aggiuntive per PATCH EFFETTO PACMAN (problema griglia)
async function deployWeapon(
    costoArma: number,
    suonoImpatto: HTMLAudioElement,
    functionEffettoArma: Function,
    removePacmanEffect?: Function
) {
    // una serie di funzioni che descrivono la logica di selezione della casella e un modo per cambiare il colore delle caselle colpite dal missile.
    let caricato = haiAbbastanzaCaricaBattery(costoArma);

    if (caricato) {
        await selectCell(costoArma);
        await functionEffettoArma("blue", "red");
        removePacmanEffect && removePacmanEffect();
        suonoImpattoArma(suonoImpatto);
        consumaCaricaBatteria(costoArma);
        ricaricaBatteria();
    } else {
        console.log("carica non ancora sufficiente");
        //giveWarningMessage("carica non ancora carica sufficiente.");
    }
}

// -------------------------------funzioni comuni armi per logica di deploy ---------------------------------------------
// funzioni comuni a tutte le armi per la selzione della casella cliccata.

function haiAbbastanzaCaricaBattery(costoArma: number) {
    if (util.BatteryCharge < costoArma) {
        giveMessage("non hai sufficiente carica per usare quest'arma.");
        return false;
    }

    return true;
}

async function selectCell(costoArma: number): Promise<string> {
    return new Promise((res) => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, i) => {
            const handleClick = () => {
                if (util.selectedTruppa !== "") {
                    util.BatteryCharge < costoArma && giveWarningMessage("non hai abbastanza carica");
                }

                util.selectedCell = `c${i}`;
                if (cell.classList.contains("red")) {
                    util.cellColor = "red";
                    res(util.cellColor);
                    return;
                }

                if (cell.classList.contains("blue")) {
                    util.cellColor = "blue";
                    res(util.cellColor);
                    return;
                }
            };

            // Rimuovo l'eventuale precedente listener
            cell.removeEventListener("click", handleClick);

            cell.addEventListener("click", handleClick);
        });
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
        giveMessage("nessuna truppa selezionata.");
        return;
    }
    // se truppa seleziona è missile succederà qualcosa
}

// interrompo il looking sulla truppa selezionata.
function stopSelezioneTruppe() {
    console.log("non sto guardando alla truppa selezionata.");
    clearInterval(util.intervalTruppaSelez);
}
