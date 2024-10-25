import { util } from "../main";

export function ricaricaBatteria() {
    // pulisco intervallo ogni volta che richiamo la funzione
    clearInterval(util.intervalRicaricaBatteria);

    let slots = document.querySelectorAll(".slot");
    // util.currentSlot = util.puntoCaricamentoBatteria;

    util.intervalRicaricaBatteria = setInterval(() => {
        if (!util.isGameStarted) {
            //util.puntoCaricamentoBatteria = util.currentSlot;
            util.hoMessoPausaAlmenoUnaVolta = true;
            clearInterval(util.intervalRicaricaBatteria);
            return;
        }

        if (util.puntoCaricamentoBatteria < slots.length) {
            let slot = slots[util.puntoCaricamentoBatteria];

            slot.classList.add("fillSlot");
            util.BatteryCharge < 6 ? util.BatteryCharge++ : null;
            util.puntoCaricamentoBatteria++;
            //

            console.log(util.puntoCaricamentoBatteria, "punto caricamento batteria ");
            console.log(util.BatteryCharge, "carica Batteria");
            // }
        } else {
            clearInterval(util.intervalRicaricaBatteria);
        }
    }, 1000);
}
