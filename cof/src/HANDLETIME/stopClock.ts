import { util } from "../main";

export function stopClock() {
    console.log("sono in stop clock");
    clearInterval(util.id);
}
