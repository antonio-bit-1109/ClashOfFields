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
                cell?.classList.add("blue");
                cell?.classList.remove("red");
            });

            // adesso in maniera ciclica devo andare a prendere le caselle intorno al corpo e cambiarle tutte di colore, finche non raggiungo il raggio desiderato.
            raggioAzioneMartello();
        }

        res(true);
    });
}

// l azione del martello prevede che per cinque volte, (o raggio 5??), il martello vada colorando del mio colore tutte le caselle intorno al suo corpo.
function raggioAzioneMartello() {
    // creo un array che contiene le stesse celle del crpo martello ma eliminando la cella centrale.
    const startcells = [...util.corpoArmaMartello];
    startcells.splice(0, 1);

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
    let raggioUpCentr: number = 0;
    let raggioMidSn: number = 0;
    let raggioMidDx: number = 0;
    let raggioDownCentr: number = 0;

    // util.intervalPropagazioneLineareMartello = setInterval(() => {

    // let linearInterval: ReturnType<typeof setInterval>;

    arrayCells.forEach((className) => {
        if (cellUpCentr.classList.contains(className)) {
            let value = findNext(className, -43);

            util.linearIntervalUpCentr = setInterval(() => {
                if (!util.isGameStarted) {
                    return;
                }

                // if (raggioUpCentr < 4) {
                let nextCell = document.querySelector(value);
                if (!nextCell?.classList.contains("b")) {
                    if (nextCell) {
                        let val = propagate(nextCell, value, -43);
                        value = val;
                        raggioUpCentr++;
                    }
                }
                // } else {
                //     clearInterval(util.linearIntervalUpCentr);
                // }
            }, 800);
        }
    });

    arrayCells.forEach((className) => {
        if (cellMidSn.classList.contains(className)) {
            let value = findNext(className, -1);

            util.linearIntervalMidSn = setInterval(() => {
                if (!util.isGameStarted) {
                    return;
                }

                // if (raggioMidSn < 4) {
                let nextCell = document.querySelector(value);
                if (!nextCell?.classList.contains("b")) {
                    if (nextCell) {
                        let val = propagate(nextCell, value, -1);
                        value = val;
                        raggioMidSn++;
                    }
                }
                // } else {
                //     clearInterval(util.linearIntervalMidSn);
                // }
            }, 800);
        }
    });

    arrayCells.forEach((className) => {
        if (cellMidDx.classList.contains(className)) {
            let value = findNext(className, +1);

            util.linearIntervalMidDx = setInterval(() => {
                if (!util.isGameStarted) {
                    return;
                }

                // if (raggioMidDx < 4) {
                let nextCell = document.querySelector(value);
                if (!nextCell?.classList.contains("b")) {
                    if (nextCell) {
                        let val = propagate(nextCell, value, +1);
                        value = val;
                        raggioMidDx++;
                    }
                }
                // } else {
                //     clearInterval(util.linearIntervalMidDx);
                // }
            }, 800);
        }
    });

    arrayCells.forEach((className) => {
        if (cellDownCentr.classList.contains(className)) {
            let value = findNext(className, +43);

            util.linearIntervalDownCntr = setInterval(() => {
                if (!util.isGameStarted) {
                    return;
                }

                // if (raggioDownCentr < 4) {
                let nextCell = document.querySelector(value);
                if (!nextCell?.classList.contains("b")) {
                    if (nextCell) {
                        let val = propagate(nextCell, value, +43);
                        value = val;
                        raggioDownCentr++;
                    }
                }
                // } else {
                //     clearInterval(util.linearIntervalDownCntr);
                // }
            }, 800);
        }
    });
}

// funzione per descrivere la propagazione angolare dell "onda d'urto" del martello
function angularPropagation(cellUpDx: Element, cellUpSn: Element, cellDownSn: Element, cellDownDx: Element) {
    let critClass0 = retriveCriticalClass(cellUpDx);
    if (critClass0) {
        goUp(critClass0);
        goDx(critClass0);
        goUpRigth(critClass0);
    }

    let critClass1 = retriveCriticalClass(cellUpSn);
    if (critClass1) {
        goUp(critClass1);
        goSn(critClass1);
        goUpLeft(critClass1);
    }

    let critClass2 = retriveCriticalClass(cellDownSn);
    if (critClass2) {
        goDown(critClass2);
        goSn(critClass2);
        goDownLeft(critClass2);
    }

    let critClass3 = retriveCriticalClass(cellDownDx);
    if (critClass3) {
        goDown(critClass3);
        goDx(critClass3);
        goDownRigth(critClass3);
    }
}

export function retriveCriticalClass(cell: Element) {
    let classiCellUpDx = Array.from(cell.classList);
    let criticalClass;
    for (let i = 0; i < classiCellUpDx.length; i++) {
        const myClass = classiCellUpDx[i];
        console.log(myClass);
        if (myClass[0] === "c" && !isNaN(Number(myClass[1]))) {
            criticalClass = myClass;
            console.log("QUESTA è GIUSTA!!", criticalClass);
            break;
        } else {
            console.error("not this one");
        }
    }
    return criticalClass;
}

function goUp(className: string) {
    let value = findNext(className, -43);
    document.querySelector(value)?.classList.add("blue");
}
function goDown(className: string) {
    let value = findNext(className, +43);
    document.querySelector(value)?.classList.add("blue");
}
function goDx(className: string) {
    let value = findNext(className, +1);
    document.querySelector(value)?.classList.add("blue");
}
function goSn(className: string) {
    let value = findNext(className, -1);
    document.querySelector(value)?.classList.add("blue");
}
function goUpRigth(className: string) {
    let value = findNext(className, -42);
    document.querySelector(value)?.classList.add("blue");
}
function goUpLeft(className: string) {
    let value = findNext(className, -44);
    document.querySelector(value)?.classList.add("blue");
}
function goDownRigth(className: string) {
    let value = findNext(className, +44);
    document.querySelector(value)?.classList.add("blue");
}
function goDownLeft(className: string) {
    let value = findNext(className, +42);
    document.querySelector(value)?.classList.add("blue");
}

function findNext(className: string, modificator: number) {
    let nextCell = className.slice(1);
    let value: number = parseInt(nextCell) + modificator;
    console.log(value);
    return `.c${value}`;
}

// funzione che prende in input elemento dom della cella e gli aggiunge la classe blue
function propagate(nextCell: Element, value: string, modificator: number) {
    nextCell && nextCell.classList.add("blue");
    nextCell && nextCell.classList.remove("red");
    //value = findNext(className, -43);
    let next = value.slice(2);
    let nextValue = parseInt(next) + modificator;
    return (value = `.c${nextValue}`);
    // raggio++;
}
