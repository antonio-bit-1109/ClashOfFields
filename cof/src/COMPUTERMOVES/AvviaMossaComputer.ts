import { retriveCriticalClass } from "../DEPLOYWEAPON/deployRaggioAzioneMartello";
import { laserZapSound, missleExplSound, suonoImpattoArma } from "../main";
import { util } from "../main";
import { deployRaggioLaserComputer } from "./DeployLaserComputer";
import { deployMissileComputer } from "./DeployMissileComputer";

interface IUtil_pc {
    batteriaPc: number;
    raggioAzioneMissilePc: string[];
    corpoRaggioLaserComputer: string[];
}

export const utilPc: IUtil_pc = {
    batteriaPc: 0,
    raggioAzioneMissilePc: [],
    corpoRaggioLaserComputer: [],
};

export function AvviaMossaComputer() {
    // ricarica batteriapc
    // INTERROMPI GLI INTERVAL ALLA PAUSA E ALLA FINE GIOCO -- INFILALI IN OGGETTO UTIL
    util.intervalRicaricaBattPc = setInterval(() => {
        utilPc.batteriaPc++;
    }, 1000);

    // ogni 3 secondi tira una mossa del pc
    util.faiMossaPc = setInterval(() => {
        if (utilPc.batteriaPc < 2) {
            return;
        }
        // se gioco in pausa non fare deploy
        if (!util.isGameStarted) {
            return;
        }
        // altrimenti fai deploy
        deployWeaponPc();
    }, 3000);
}

export function deployWeaponPc() {
    const arrArmiDisp = ["Missle", "Laser" /*, "Martello"*/];
    let random = Math.floor(Math.random() * arrArmiDisp.length);

    let randomWep = arrArmiDisp[random];

    do {
        // scelgo una casella blue a caso.
        const allBlueCells = document.querySelectorAll(".blue");
        let randomNum = Math.floor(Math.random() * allBlueCells.length);
        const selectCell = allBlueCells[randomNum];

        if (randomWep === "Missle" && utilPc.batteriaPc >= 3) {
            // genera num random per cella su cui fare deploy
            let critClass = retriveCriticalClass(selectCell);
            critClass && deployMissileComputer(critClass);
            suonoImpattoArma(missleExplSound, 0.05);
            utilPc.batteriaPc -= 3;
            //entra
            // chiama deploymissile
            // decrementa la batteria
            return;
        }

        if (randomWep === "Laser" && utilPc.batteriaPc >= 2) {
            const allRedsCells = document.querySelectorAll(".red");
            let randomNum = Math.floor(Math.random() * allRedsCells.length);
            const selectCell = allRedsCells[randomNum];
            // genera num random per cella su cui fare deploy
            let critClass = retriveCriticalClass(selectCell);
            critClass && deployRaggioLaserComputer(critClass);
            suonoImpattoArma(laserZapSound, 0.05);
            utilPc.batteriaPc -= 2;
            //entra
            // chiama deploymissile
            // decrementa la batteria
            return;
        }

        console.log("sto aspettando la batteria caricarsi");
    } while (utilPc.batteriaPc < 2);
}
