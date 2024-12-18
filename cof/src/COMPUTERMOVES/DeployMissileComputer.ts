import { eliminaCorpoArma } from "../HANDLEGAME/eliminaCorpoArma";
import { removeAnimationClass } from "../HANDLEGAME/pulisciCellaDaAnimazione";
import { utilPc } from "./AvviaMossaComputer";

export async function deployMissileComputer(cellOfDeploiment: string): Promise<boolean> {
    return new Promise((res) => {
        // pulisco array ogni qual volta voglio fare il deploy di un missile
        utilPc.raggioAzioneMissilePc.length = 0;
        // pusho in array tutte le stringhe , che corrispondono alle classi delle celle, su cui voglio che il missile abbia un raggio d'azione.
        utilPc.raggioAzioneMissilePc.push(
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 0).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 1).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 2).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 3).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 4).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 1).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 2).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 3).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 4).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 40).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 41).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 42).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 43).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 44).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 45).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 46).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 40).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 41).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 42).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 43).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 44).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 45).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 46).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 84).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 85).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 86).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 87).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 88).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 84).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 85).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 86).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 87).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 88).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 130).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 129).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 128).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 130).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 129).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 128).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) + 172).toString(),
            "c" + (parseInt(cellOfDeploiment.slice(1)) - 172).toString()
        );
        // console.log(util);
        utilPc.raggioAzioneMissilePc.forEach((value) => {
            let cell = document.querySelector(`.${value}`);
            console.log(cell, "cella selezionata");
            if (cell && !cell.classList.contains("b")) {
                //se la cella cliccata si trova distanziato di n-3, n-4 , n-46 , n+40 ad una delle celle della successione regolare classe "b" alla classe n

                cell.classList.add("red");
                cell.classList.remove("blue");
                cell.classList.add("flip-cell");
                cell.addEventListener("animationend", () => {
                    removeAnimationClass(cell);
                });
                eliminaCorpoArma(cell);
            }
        });

        console.log(utilPc.raggioAzioneMissilePc);
        res(true);
    });
}
