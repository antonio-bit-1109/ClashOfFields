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
        }

        console.log("carica batteria", util.BatteryCharge);
        console.log("carica batteria", util.puntoCaricamentoBatteria);
        // Decrementa BatteryCharge e util.puntoCaricamentoBatteria dopo il ciclo
        util.BatteryCharge -= rimosse;
        util.puntoCaricamentoBatteria -= rimosse;
    }
    console.log("carica batteria", util.BatteryCharge);
    console.log("carica batteria", util.puntoCaricamentoBatteria);
}
