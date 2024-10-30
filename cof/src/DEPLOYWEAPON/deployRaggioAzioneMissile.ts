import { eliminaCorpoArma } from "../HANDLEGAME/eliminaCorpoArma";
import { removeAnimationClass } from "../HANDLEGAME/pulisciCellaDaAnimazione";
import { util } from "../main";

export async function deployRaggioAzioneMissile(colorToAdd: string, colorToRemove: string): Promise<boolean> {
    return new Promise((res) => {
        // pulisco array ogni qual volta voglio fare il deploy di un missile
        util.raggioAzioneArma.length = 0;
        // pusho in array tutte le stringhe , che corrispondono alle classi delle celle, su cui voglio che il missile abbia un raggio d'azione.
        util.raggioAzioneArma.push(
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

        util.raggioAzioneArma.forEach((value) => {
            let cell = document.querySelector(`.${value}`);
            console.log(cell, "cella selezionata");
            if (cell && !cell.classList.contains("b")) {
                cell.classList.add(colorToAdd);
                cell.classList.remove(colorToRemove);
                cell.classList.add("flip-cell");
                cell.addEventListener("animationend", () => {
                    removeAnimationClass(cell);
                });

                // ogni qual volta faccio deploy missile, se nelle classi bersaglio è presente una classe corpo (corpoarma) la rimuovo. A video verrà rimossa la classe che identifica il corpo dell arma
                eliminaCorpoArma(cell);
            }
        });

        res(true);
    });
}
