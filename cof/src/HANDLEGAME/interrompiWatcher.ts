import { util } from "../main";

export function interrompiWatcher() {
    clearInterval(util.intervalTruppaSelez);
    clearInterval(util.intervalSchieraTruppa);
    clearInterval(util.intervalRicaricaBatteria);
    // ---- interruzione intervalli di propagazione lineare del martello -----
    // clearInterval(util.intervalPropagazioneLineareMartello);
    clearInterval(util.linearIntervalUpCentr);
    clearInterval(util.linearIntervalMidSn);
    clearInterval(util.linearIntervalMidDx);
    clearInterval(util.linearIntervalDownCntr);
    clearInterval(util.intervalRicaricaBattPc);
    clearInterval(util.faiMossaPc);
    // clearInterval(util.intervalPropagazioneLineareMartello);
    // clearInterval(util.intervalPropagazioneAngolareMartello);
}
