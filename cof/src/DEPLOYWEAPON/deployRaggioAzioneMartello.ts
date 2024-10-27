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
function raggioAzioneMartello() {}
