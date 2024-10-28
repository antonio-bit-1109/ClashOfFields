import { giveWarningMessage } from "../HANDLEMESSAGES/warningMessage";
import { util } from "../main";

export async function deployRaggioAzioneMartello() {
    return new Promise((res, rej) => {
        let isBlueCell = false;
        // controllo che la cella selezionata sia del colore del giocatore (blue)
        const selectedCell = document.querySelector(`.${util.selectedCell}`);

        if (selectedCell) {
            selectedCell.classList.contains("blue") ? (isBlueCell = true) : (isBlueCell = false);

            if (!isBlueCell) {
                giveWarningMessage("puoi piantare il martello solo sulle tue caselle.");
                return;
            }
            // pulisco array ogni qual volta voglio fare il deploy di un arma - pulisco array nel quale verrà posizionato corpo arma
            // pulisco array nel quale inserisco raggio azione arma, in questo caso laser
            util.raggioAzioneArma.length = 0;
            util.corpoArmaLaser.length = 0;
            util.corpoArmaMartello.length = 0;
            // pusho in array corpoarma tutte quelle stringhe che mi identificano le classi del corpo dell arma.
            util.corpoArmaMartello.push(
                "c" + (parseInt(util.selectedCell.slice(1)) + 0).toString(),
                "c" + (parseInt(util.selectedCell.slice(1)) + 1).toString(),
                "c" + (parseInt(util.selectedCell.slice(1)) - 1).toString(),
                "c" + (parseInt(util.selectedCell.slice(1)) + 42).toString(),
                "c" + (parseInt(util.selectedCell.slice(1)) + 43).toString(),
                "c" + (parseInt(util.selectedCell.slice(1)) + 44).toString(),
                "c" + (parseInt(util.selectedCell.slice(1)) - 42).toString(),
                "c" + (parseInt(util.selectedCell.slice(1)) - 43).toString(),
                "c" + (parseInt(util.selectedCell.slice(1)) - 44).toString()
            );

            // le celle contenenti queste classi cambiano colore e diventano il corpo dell arma laser
            util.corpoArmaMartello.forEach((value) => {
                let cell = document.querySelector(`.${value}`);
                cell?.classList.add("corpoMartello");
            });

            // adesso in maniera ciclica devo andare a prendere le caselle intorno al corpo e cambiarle tutte di colore, finche non raggiungo il raggio desiderato.
            raggioAzioneMartello();
        }

        res(true);
    });
}

// l azione del martello prevede che per cinque volte, (o raggio 5??), il martello vada colorando del mio colore tutte le caselle intorno al suo corpo.
function raggioAzioneMartello() {
    console.log("sono dentro raggio azione martello");
    // creo un array che contiene le stesse celle del crpo martello ma eliminando la cella centrale.
    const startcells = [...util.corpoArmaMartello];
    startcells.splice(0, 1);
    console.log(startcells, "STARTCELLS");

    let cellUpSn;
    let cellUpCentr;
    let cellUpDx;
    let cellMidSn;
    let cellMidDx;
    let cellDownSn;
    let cellDownCentr;
    let cellDownDx;

    for (let i = 0; i < startcells.length; i++) {
        if (i === 0) {
            cellMidDx = document.querySelector(`.${startcells[i]}`);
        }
        if (i === 1) {
            cellMidSn = document.querySelector(`.${startcells[i]}`);
        }
        if (i === 2) {
            cellDownSn = document.querySelector(`.${startcells[i]}`);
        }
        if (i === 3) {
            cellDownCentr = document.querySelector(`.${startcells[i]}`);
        }
        if (i === 4) {
            cellDownDx = document.querySelector(`.${startcells[i]}`);
        }
        if (i === 5) {
            cellUpDx = document.querySelector(`.${startcells[i]}`);
        }
        if (i === 6) {
            cellUpCentr = document.querySelector(`.${startcells[i]}`);
        }
        if (i === 5) {
            cellUpDx = document.querySelector(`.${startcells[i]}`);
        }
        if (i === 7) {
            cellUpSn = document.querySelector(`.${startcells[i]}`);
        }
    }

    if (cellUpCentr && cellMidSn && cellMidDx && cellDownCentr && startcells) {
        linearPropagation(cellUpCentr, cellMidSn, cellMidDx, cellDownCentr, startcells);
    }

    if (cellUpDx && cellUpSn && cellDownSn && cellDownDx) {
        angularPropagation(cellUpDx, cellUpSn, cellDownSn, cellDownDx);
    }
}

// prendo il corpo del martello e mi trovo ogni cella, eccetto  la cella centrale, da cui farò iniziare la propagazione.
// function assignNode(className: string) {
//     return document.querySelector(className);
// }

// funzione per descrivre la progazione lineare dell "onda d'urto" del martello
function linearPropagation(
    cellUpCentr: Element,
    cellMidSn: Element,
    cellMidDx: Element,
    cellDownCentr: Element,
    arrayCells: string[]
) {
    // AGGIUNGI AD OGNI FUNZIONE IN BOOLEAN PER INTERRROMPERE L INTERVAL (PAUSA) E FARLO RIPRENDERE A RIPRESA GIOCO

    util.intervalPropagazioneLineareMartello = setInterval(() => {
        console.log("sono dentro linear propagation");

        arrayCells.forEach((className) => {
            console.log(className);
            if (cellUpCentr.classList.contains(className)) {
                let value = findNext(className, -43);
                let nextCell = document.querySelector(value);
                if (!nextCell?.classList.contains("b")) {
                    nextCell && nextCell.classList.add("blue");
                }

                // let sliceValue = value.slice(2);
                // let next = parseInt(sliceValue) - 43;
                // let formattedNext = `.c${next}`;
                // value = formattedNext;
            }
        });
        arrayCells.forEach((className) => {
            console.log(className);
            if (cellMidSn.classList.contains(className)) {
                let value = findNext(className, -1);
                let nextCell = document.querySelector(value);
                if (!nextCell?.classList.contains("b")) {
                    nextCell && nextCell.classList.add("blue");
                }
            }
        });
        arrayCells.forEach((className) => {
            console.log(className);
            if (cellMidDx.classList.contains(className)) {
                let value = findNext(className, +1);
                let nextCell = document.querySelector(value);
                if (!nextCell?.classList.contains("b")) {
                    nextCell && nextCell.classList.add("blue");
                }
            }
        });
        arrayCells.forEach((className) => {
            console.log(className);
            if (cellDownCentr.classList.contains(className)) {
                let value = findNext(className, +43);
                let nextCell = document.querySelector(value);
                if (!nextCell?.classList.contains("b")) {
                    nextCell && nextCell.classList.add("blue");
                }
            }
        });
    }, 1500);
}

// funzione per descrivere la propagazione angolare dell "onda d'urto" del martello
function angularPropagation(cellUpDx: Element, cellUpSn: Element, cellDownSn: Element, cellDownDx: Element) {
    util.intervalPropagazioneAngolareMartello = setInterval(() => {}, 1500);
}

function findNext(className: string, modificator: number) {
    let nextCell = className.slice(1);
    let value: number = parseInt(nextCell) + modificator;
    console.log(value);
    return `.c${value}`;
}

// export function stopPropagazioneMartello() {
//     clearInterval(util.intervalPropagazioneLineareMartello);
//     clearInterval(util.intervalPropagazioneAngolareMartello);
// }
