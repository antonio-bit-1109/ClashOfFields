import { util } from "../main";

import { interrompiWatcher } from "../HANDLEGAME/interrompiWatcher";
import { DecretaVincitore } from "../HANDLEGAME/decretaVincitore";
import { giveMessage } from "../HANDLEMESSAGES/giveMessage";

export function startClock(timer: HTMLElement) {
    console.log("sono in start clock");
    util.id = setInterval(() => {
        // Incremento del timer di gioco (secondi e minuti)

        // Decrementa i decimi di secondo
        util.secDx--;

        // Se i decimi di secondo sono meno di 0, decrementa i secondi
        if (util.secDx < 0) {
            util.secDx = 9;
            util.secSn--;
        }

        // Se i secondi sono meno di 0, decrementa i decimi di minuto
        if (util.secSn < 0) {
            util.secSn = 5;
            util.minDx--;
        }

        // Se i decimi di minuto sono meno di 0, decrementa i minuti
        if (util.minDx < 0) {
            util.minDx = 9;
            util.minSn--;
        }

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
