import { util } from "../main";

export function interrompiWatcher() {
    clearInterval(util.intervalTruppaSelez);
    clearInterval(util.intervalSchieraTruppa);
    clearInterval(util.intervalRicaricaBatteria);
    // clearInterval(util.intervalAvanzaLaser);
}
