import { giveWarningMessage } from "../HANDLEMESSAGES/warningMessage";
import { util } from "../main";

export function deployRaggioAzioneLaser(colorToAdd: string, colorToRemove: string): Promise<boolean> {
    return new Promise((res, rej) => {
        let isBlueCell = false;
        // controllo che la cella selezionata sia del colore del giocatore (blue)
        const selectedCell = document.querySelector(`.${util.selectedCell}`);

        if (selectedCell) {
            selectedCell.classList.contains("blue") ? (isBlueCell = true) : (isBlueCell = false);

            if (!isBlueCell) {
                giveWarningMessage("puoi piantare la torretta solo sulle tue caselle.");
                return;
            }
            // pulisco array ogni qual volta voglio fare il deploy di un arma - pulisco array nel quale verrà posizionato corpo arma
            // pulisco array nel quale inserisco raggio azione arma, in questo caso laser
            util.raggioAzioneArma.length = 0;
            util.corpoArma.length = 0;
            // pusho in array corpoarma tutte quelle stringhe che mi identificano le classi del corpo dell arma.
            util.corpoArma.push(
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
            util.corpoArma.forEach((value) => {
                let cell = document.querySelector(`.${value}`);
                cell?.classList.add("corpoLaser");
            });

            // adesso in maniera ciclica (setinterval) vado prendendendo le tre caselle di fronte al corpo del arma e le cambio di colore finche non incontro una cella con classe "b" , bordo della griglia , che mi fare interropmere il ciclo.
            raggioAzioneLaser();
        }

        res(true);
    });
}

function raggioAzioneLaser() {
    console.log("sono in raggio azione laser ");
    // mi prendo le tre caselle superiori del corpo della torretta e per ogniuna di esse faccio partire un setinterval che gli fa mangiare la casella davanti a se ogni x ms
    // le prime tre cell da cui far partire il ciclo sono le ultime tre presenti in util.corpoarma
    // quinid ciclo dalla fine dell array solog li ultimi 3 elementi

    // for (let i = util.corpoArma.length - 1; i >= util.corpoArma.length - 3; i--) {

    // }

    // prendo gli ultimi 3 valori dall array che corrispondono alle 3 caselle fontali del laser, da cui faccio partire un ciclo
    console.log(util.corpoArma);
    let cellSnClass = util.corpoArma[util.corpoArma.length - 1];
    let cellCentrClass = util.corpoArma[util.corpoArma.length - 2];
    let cellDxClass = util.corpoArma[util.corpoArma.length - 3];

    console.log(cellSnClass, /* cellCentrClass */ cellDxClass);

    // prendo le caselle dal DOM
    const cellSn = document.querySelector(`.${cellSnClass}`);
    const cellCentr = document.querySelector(`.${cellCentrClass}`);
    const cellDx = document.querySelector(`.${cellDxClass}`);

    if (cellSn && cellCentr && cellDx) {
        avanzaLaser(cellSnClass);
        avanzaLaser(cellCentrClass);
        avanzaLaser(cellDxClass);
    }
}

export function avanzaLaser(classeRef: string) {
    console.log(classeRef);
    let numero = parseInt(classeRef.slice(1)); // Estrai la parte numerica e convertila in numero
    console.log(numero);
    let somma = numero - 43; // Somma il valore desiderato iniziale

    util.intervalAvanzaLaser = setInterval(() => {
        const nuovaClasse = `c${somma}`; // Crea la nuova stringa con il prefisso "c"
        console.log("sono in start laser");
        console.log("nuovaClasse", nuovaClasse);
        const cellaAvanti = document.querySelector(`.${nuovaClasse}`); // Seleziona l'elemento con la nuova classe
        if (cellaAvanti) {
            if (!cellaAvanti.classList.contains("blue") && !cellaAvanti.classList.contains("b")) {
                cellaAvanti.classList.add("blue");
                cellaAvanti.classList.remove("red");
            }
            somma -= 43; // Aggiorna somma per la prossima iterazione
        }
    }, 500);
}
