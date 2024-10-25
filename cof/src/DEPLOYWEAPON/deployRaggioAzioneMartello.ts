import { util } from "../main";

export async function deployRaggioAzioneMartello() {
    return new Promise((res, rej) => {
        // controllo che la cella selezionata sia del colore del giocatore (blue)
        const selectedCell = document.querySelector(`.${util.selectedCell}`);

        if (selectedCell) {
            console.log("sono in deploy martello ");
        }

        res(true);
    });
}
