import { util } from "../main";

// funzione che gestisce la presenza o meno del "velo" sulla griglia. se gioco in pausa metto velo e giocatore non puo cliccare la griglia per fare deploy arma, quando gicoo riparte tolgo velo
export function handleVeloGriglia() {
    const velo = document.querySelector(".velo");

    if (util.primoAvvio) {
        return;
    }

    if (!util.isGameStarted) {
        velo?.classList.remove("d-none");
        return;
    }

    if (util.isGameStarted) {
        velo?.classList.add("d-none");
        return;
    }
}
