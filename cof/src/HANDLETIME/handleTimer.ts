import { util } from "../main";
import { startClock } from "./startClock";
import { stopClock } from "./stopClock";

export function handleTimer() {
    const timer = document.getElementById("timer");

    if (timer) {
        timer.classList.remove("d-none");
        // se il gioco è avviato, avvia il timer, togli d-none al div
        util.isGameStarted && startClock(timer);
        // se il gioco è bloccato interrompi il timer
        !util.isGameStarted && stopClock();
    }
}
