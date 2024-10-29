import { retriveCriticalClass } from "../DEPLOYWEAPON/deployRaggioAzioneMartello";
import { missleExplSound, suonoImpattoArma } from "../main";
import { util } from "../main";

let batteriaPc = 0;
let raggioAzioneMissilePc: string[] = [];

export function AvviaMossaComputer() {
    // ricarica batteriapc
    // INTERROMPI GLI INTERVAL ALLA PAUSA E ALLA FINE GIOCO -- INFILALI IN OGGETTO UTIL
    util.intervalRicaricaBattPc = setInterval(() => {
        batteriaPc++;
    }, 1000);

    // ogni 3 secondi tira una mossa del pc
    util.faiMossaPc = setInterval(() => {
        if (batteriaPc < 2) {
            return;
        }

        if (!util.isGameStarted) {
            return;
        }
        suonoImpattoArma(missleExplSound, 0.05);
        deployWeaponPc();
    }, 3000);
}

export function deployWeaponPc() {
    const arrArmiDisp = ["Missle", "Laser", "Martello"];
    let random = Math.floor(Math.random() * arrArmiDisp.length);

    // let randomWep = arrArmiDisp[random];
    let randomWep = "Missle";

    do {
        if (randomWep === "Missle" && batteriaPc >= 3) {
            // genera num random per cella su cui fare deploy

            const allBlueCells = document.querySelectorAll(".blue");
            let randomNum = Math.floor(Math.random() * allBlueCells.length);
            const selectCell = allBlueCells[randomNum];
            // console.log(selectCell, "CELLA SELECTED");

            let critClass = retriveCriticalClass(selectCell);
            // const pickUpRandomNum = Math.floor(Math.random() * allBlueCells.length);
            // console.log(pickUpRandomNum, "randooooommmm");
            critClass && deployMissileComputer(critClass);
            //entra
            // chiama deploymissile
            // decrementa la batteria
        }
        console.log("sto aspettando la batteria caricarsi");
    } while (batteriaPc < 3);
}

// function retriveCriticalClass(cell: Element) {
//     let classiCellUpDx = Array.from(cell.classList);
//     let criticalClass;
//     for (let i = 0; i < classiCellUpDx.length; i++) {
//         const myClass = classiCellUpDx[i];
//         console.log(myClass);
//         if (myClass[0] === "c" && !isNaN(Number(myClass[1]))) {
//             criticalClass = myClass;
//             console.log("QUESTA è GIUSTA!!", criticalClass);
//             break;
//         } else {
//             console.error("not this one");
//         }
//     }
//     return criticalClass;
// }

export async function deployMissileComputer(cellOfDeploiment: string): Promise<boolean> {
    return new Promise((res) => {
        // pulisco array ogni qual volta voglio fare il deploy di un missile
        raggioAzioneMissilePc.length = 0;
        // pusho in array tutte le stringhe , che corrispondono alle classi delle celle, su cui voglio che il missile abbia un raggio d'azione.
        raggioAzioneMissilePc.push(
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
        raggioAzioneMissilePc.forEach((value) => {
            let cell = document.querySelector(`.${value}`);
            console.log(cell, "cella selezionata");
            if (cell && !cell.classList.contains("b")) {
                //se la cella cliccata si trova distanziato di n-3, n-4 , n-46 , n+40 ad una delle celle della successione regolare classe "b" alla classe n
                // adiacentCellToBorderCell(value);
                cell.classList.add("red");
                cell.classList.remove("blue");
                cell.classList.add("flip-cell");
            }
        });

        console.log(raggioAzioneMissilePc);
        res(true);
    });
}
