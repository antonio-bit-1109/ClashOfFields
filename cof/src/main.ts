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
import { changeSfondoMessageBox } from "./FETCHES/changeSfondo";
import { builderName } from "./BUILDERNAMES/builderName";
import { nascondiOptions, scegliTempoDiGioco } from "./HANDLETIME/ScegliTempoGioco";
import { stopSchieraTruppa, stopSelezioneTruppe, truppaSelezionata } from "./HANDLEGAME/handleTruppaSelezionata";
import { deployRaggioAzioneMartello } from "./DEPLOYWEAPON/deployRaggioAzioneMartello";
import { AvviaMossaComputer } from "./COMPUTERMOVES/AvviaMossaComputer";
// ERORRE FINTO, NON è VERO
import ColorThief from "color-thief-ts";
// import { removeAnimationClasses } from "./HANDLEGAME/pulisciCellaDaAnimazione";

// oggetto builder per generare parole random
let parolaObj = new builderName();

// suoni-audio
export const missleExplSound = new Audio("../sounds/missleExpl.mp3");
export const laserZapSound = new Audio("../sounds/laser_zap.mp3");
export const hammerCrush = new Audio("../sounds/crush.mp3");
const sottofondoMusic = new Audio("../sounds/sottofondo.mp3");

// interfaccia
interface IUtil {
    schiera: boolean;
    BatteryCharge: number;
    isGameStarted: boolean;
    primoAvvio: boolean;
    puntoCaricamentoBatteria: number;
    minSn: number;
    minDx: number;
    secSn: number;
    secDx: number;
    selectedTruppa: string;
    id: ReturnType<typeof setInterval>;
    intervalTruppaSelez: ReturnType<typeof setInterval>;
    intervalSchieraTruppa: ReturnType<typeof setInterval>;
    intervalRicaricaBatteria: ReturnType<typeof setInterval>;
    linearIntervalUpCentr: ReturnType<typeof setInterval>;
    linearIntervalMidSn: ReturnType<typeof setInterval>;
    linearIntervalMidDx: ReturnType<typeof setInterval>;
    linearIntervalDownCntr: ReturnType<typeof setInterval>;
    intervalRicaricaBattPc: ReturnType<typeof setInterval>;
    // ritardaRimozioneAnimazione: ReturnType<typeof setInterval>;
    faiMossaPc: ReturnType<typeof setInterval>;
    refAvanzamentoLaser: string;
    selectedCell: string;
    cellColor: string;
    raggioAzioneArma: string[];
    corpoArmaLaser: string[];
    corpoArmaMartello: string[];
    hoMessoPausaAlmenoUnaVolta: boolean;
    redCells: number;
    blueCell: number;
    sfondo: string;
}

// oggetto contenente alcune variabili blobali
export const util: IUtil = {
    schiera: false,
    BatteryCharge: 0,
    isGameStarted: false,
    primoAvvio: true,
    puntoCaricamentoBatteria: 0,
    minSn: 0,
    minDx: 0,
    secSn: 4,
    secDx: 5,
    selectedTruppa: "",
    id: setInterval(() => {}, 0),
    intervalTruppaSelez: setInterval(() => {}, 0), // Placeholder initialization
    intervalSchieraTruppa: setInterval(() => {}, 0), // Placeholder initialization
    intervalRicaricaBatteria: setInterval(() => {}, 0), // Placeholder initialization
    linearIntervalUpCentr: setInterval(() => {}, 0),
    linearIntervalMidSn: setInterval(() => {}, 0),
    linearIntervalMidDx: setInterval(() => {}, 0),
    linearIntervalDownCntr: setInterval(() => {}, 0),
    intervalRicaricaBattPc: setInterval(() => {}, 0),
    // ritardaRimozioneAnimazione: setInterval(() => {}, 0),
    faiMossaPc: setInterval(() => {}, 0),
    refAvanzamentoLaser: "",
    selectedCell: "",
    cellColor: "",
    raggioAzioneArma: [],
    corpoArmaLaser: [],
    corpoArmaMartello: [],
    hoMessoPausaAlmenoUnaVolta: false,
    redCells: 0,
    blueCell: 0,
    sfondo: "",
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
    sottofondoMusic.volume = 0.04;
}

function welcomeMessage() {
    const messageBox = document.querySelector(".messagebox");
    const startButton = document.createElement("button");
    const cambiaImg = document.createElement("button");
    const GifAwaiting = document.createElement("img");
    const msgScegliTempo = document.createElement("p");

    msgScegliTempo.classList.add("pStyle", "vibrate");
    msgScegliTempo.innerHTML = `Scegli il tuo tempo di gioco, <br> ( Default : 00:45 ) `;
    GifAwaiting.src = "../imgs/load.gif";
    GifAwaiting.classList.add("gifDimension", "d-none");
    cambiaImg.classList.add("block");
    cambiaImg.innerHTML = "cambia sfondo";
    const logo = document.createElement("img");
    const warningMessage = document.createElement("p");
    warningMessage.classList.add("warning");
    logo.src = "../imgs/logo.webp";
    logo.classList.add("stileLogo");
    startButton.classList.add("button");
    startButton.classList.add("pointer");
    startButton.id = "mainBtn";
    startButton.innerHTML = "Iniziamo!";
    const welcome = document.createElement("h4");
    welcome.classList.add("h4Style");
    welcome.classList.add("welcome");
    welcome.innerHTML =
        "Benvenuto su <span style='color:red'> Clash </span> of  <span style='color:blue'> Fields! </span> <br> Facciamo una partita!";

    messageBox?.appendChild(logo);
    messageBox?.appendChild(cambiaImg);
    messageBox?.appendChild(GifAwaiting);
    messageBox?.appendChild(welcome);
    messageBox?.appendChild(warningMessage);
    messageBox?.appendChild(startButton);
    const div = scegliTempoDiGioco();
    messageBox?.appendChild(msgScegliTempo);
    messageBox?.appendChild(div);

    // abilita il bottone per cambiare sfondo
    cambiaImg.addEventListener("click", cambiaSfondo);

    // PUNTO PARTENZA PER GESTIRE AVVIO/STOP DEL GIOCO
    startButton.addEventListener("click", changeStatusGame);
    //--------------------------------------------------------//
}

async function cambiaSfondo() {
    let DoAgain: boolean = false;
    const loadingDiv = document.querySelector(".gifDimension");

    do {
        loadingDiv?.classList.remove("d-none");
        let parola = parolaObj.startPipeline();
        console.log(parola);
        let ImgFetched = await changeSfondoMessageBox(parola);

        if (ImgFetched instanceof Error) {
            DoAgain = true;
        } else {
            // const dominantColor = await colorThief.getColorAsync(ImgFetched);
            // console.log(dominantColor, "THE DOMINANT COLOOOOOOORRRRRRR");
            DoAgain = false;
            util.sfondo = ImgFetched;
            loadingDiv && (await cambiaImmagineDivMessaggi(ImgFetched, loadingDiv));
            // usa la stringa ritornata dal server come immagine
        }
    } while (DoAgain);
}

async function cambiaImmagineDivMessaggi(ImgFetched: string, loadingDiv: Element) {
    try {
        const colorThief = new ColorThief();
        const dominantColor = await colorThief.getColorAsync(ImgFetched);
        console.log(dominantColor, "DOMINANT COLORRRRRRRRRRRRRRRRRRR");
        const sfondoSection = document.querySelector(".messagebox") as HTMLElement;
        const h4_p = document.querySelector(".h4Style") as HTMLElement;
        let oppositeColor = getOppositeColor(dominantColor);

        if (sfondoSection && h4_p) {
            sfondoSection.style.backgroundImage = `url(${util.sfondo})`;
            h4_p.style.color = oppositeColor;
            loadingDiv?.classList.add("d-none");
        }
    } catch (err) {
        console.error("errore durante il cambio dell immagine" + err);
    }
}

function getOppositeColor(hexColor: string) {
    // Rimuovi il simbolo '#' se presente
    hexColor = hexColor.replace("#", "");

    // Ottieni i componenti rosso, verde e blu del colore
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    // Calcola il colore opposto invertendo ogni componente
    const oppositeR = (255 - r).toString(16).padStart(2, "0");
    const oppositeG = (255 - g).toString(16).padStart(2, "0");
    const oppositeB = (255 - b).toString(16).padStart(2, "0");

    // Combina i componenti per ottenere il colore opposto in esadecimale
    return `#${oppositeR}${oppositeG}${oppositeB}`;
}

// punto di ingresso.
function changeStatusGame() {
    AvviaMossaComputer();

    const pTime = document.querySelector(".pStyle");

    //rendi opzioni tempo invisibili a prescindere se è stata fatta una scelta o no.
    nascondiOptions();
    pTime?.classList.add("d-none");

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
            if (util.selectedTruppa !== "") {
                schieraTruppa();
            }
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
            giveMessage(`Hai selezionato  <span style='color:red;font-size:1.5em;'>${util.selectedTruppa}</span>`);
            break;
        case "Laser":
            deployWeapon(2, laserZapSound, deployRaggioAzioneLaser);
            giveMessage(`Hai selezionato  <span style='color:red;font-size:1.5em;'>${util.selectedTruppa}</span>`);
            break;
        case "Martello":
            deployWeapon(3, hammerCrush, deployRaggioAzioneMartello);
            giveMessage(`Hai selezionato  <span style='color:red;font-size:1.5em;'>${util.selectedTruppa}</span>`);
            break;
    }
}

// funzione per sentire audio dell arma che entra in campo.
export async function suonoImpattoArma(audioElement: HTMLAudioElement, volume?: number) {
    if (audioElement.currentTime > 0) {
        audioElement.currentTime = 0;
        if (volume) {
            audioElement.volume = volume;
        }
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

        if (!util.schiera) {
            return;
        }

        await functionEffettoArma("blue", "red");
        removePacmanEffect && removePacmanEffect();
        suonoImpattoArma(suonoImpatto);
        consumaCaricaBatteria(costoArma);
        ricaricaBatteria();
        util.schiera = false;
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

async function selectCell(costoArma: number): Promise<boolean> {
    return new Promise((res) => {
        const cells = document.querySelectorAll(".cell");

        // Gestisci il click sull'elemento corrente
        const handleClick = (event: Event) => {
            util.schiera = true;
            const cell = event.currentTarget as HTMLElement; // La cella cliccata
            const i = Array.from(cells).indexOf(cell); // Ottieni l'indice della cella

            // Controlla se una truppa è selezionata
            if (util.selectedTruppa !== "") {
                if (util.BatteryCharge < costoArma) {
                    giveWarningMessage("non hai abbastanza carica");
                    return;
                }

                // Memorizza l'indice della cella selezionata
                util.selectedCell = `c${i}`;

                // Controlla il colore della cella tramite le classi
                if (cell.classList.contains("red")) {
                    util.cellColor = "red";
                    res(true); // Risolvi la Promise
                    return;
                }

                if (cell.classList.contains("blue")) {
                    util.cellColor = "blue";
                    res(true); // Risolvi la Promise
                    return;
                }
            }
        };

        // Rimuovi eventuali listener precedenti e aggiungi quello nuovo
        cells.forEach((cell) => {
            cell.removeEventListener("click", handleClick); // Rimuovi eventuali listener precedenti
            cell.addEventListener("click", handleClick); // Aggiungi il listener
        });

        res(true); // Risolvi la Promise al termine della funzione
    });
}
