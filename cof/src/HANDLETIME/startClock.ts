import { util } from "../main";

import { interrompiWatcher } from "../HANDLEGAME/interrompiWatcher";
import { DecretaVincitore } from "../HANDLEGAME/decretaVincitore";
import { giveMessage } from "../HANDLEMESSAGES/giveMessage";

export function startClock(timer: HTMLElement) {
    console.log("sono in start clock");
    util.id = setInterval(() => {
        // Incremento del timer di gioco (secondi e minuti)

        //COMPLETA DECREMENTO LOGICA TIMER!!!!

        // if (util.secDx <= 0) {
        //     util.minSn--;
        //     util.secSn = 5;
        //     util.secDx = 9;
        // }

        // if (util.secDx <= 0) {
        //     util.secSn--;
        //     util.secDx = 9;
        // }

        // util.secSn--;

        // if(util.minDx <= 0){

        // }
        util.secDx--;
        if (util.secDx < 0) {
            util.secSn--;
            util.secDx = 9;
        }

        // util.secDx--;
        // if (util.secDx < 0) {
        //     util.secSn--;
        //     util.secDx = 9;
        // }

        if (util.minSn === 0 && util.minDx === 0 && util.secDx === 0 && util.secSn === 0) {
            clearInterval(util.id); // Interrompe il timer una volta raggiunto il massimo
            giveMessage("tempo scaduto!");
            interrompiWatcher();
            DecretaVincitore();
        }

        // Aggiorna la visualizzazione del timer
        timer.innerHTML = `${util.minSn}${util.minDx}:${util.secSn}${util.secDx}`;
        console.log("clock is ticking....");
    }, 1000); // Aggiorna ogni secondo
}
