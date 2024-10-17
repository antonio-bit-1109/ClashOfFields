import { util } from "../main";

export function consumaCaricaBatteria(costoArma: number) {
    clearInterval(util.intervalRicaricaBatteria);

    const taccheBatteria = document.querySelectorAll(".slot");
    let rimosse = 0;

    if (util.BatteryCharge >= costoArma && util.puntoCaricamentoBatteria >= costoArma) {
        for (let i = taccheBatteria.length - 1; i >= 0; i--) {
            if (rimosse === costoArma) {
                break;
            }

            const tacca = taccheBatteria[i];
            if (tacca.classList.contains("fillSlot")) {
                tacca.classList.remove("fillSlot");
                rimosse++;
            }
            console.log(rimosse, "tacche rimosse");
            console.log(util.puntoCaricamentoBatteria, "punto caricamento batteria");
            console.log(util.BatteryCharge, "carica Batteria");
            console.log(costoArma, "costoarma");
        }

        // Decrementa BatteryCharge e util.puntoCaricamentoBatteria dopo il ciclo
        util.BatteryCharge -= rimosse;
        util.puntoCaricamentoBatteria -= rimosse;
    }
}
