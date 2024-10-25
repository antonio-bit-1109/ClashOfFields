import { util } from "../main";

export function scegliTempoDiGioco() {
    const div = document.createElement("div");

    div.classList.add("block", "d-flex", "btnTimeContainer");

    for (let i = 0; i < 3; i++) {
        const button = document.createElement("button");
        button.classList.add("pointer", "btnTime");
        if (i === 0) {
            button.innerHTML = "00:45";
        }
        if (i === 1) {
            button.innerHTML = "01:00";
        }
        if (i === 2) {
            button.innerHTML = "01:30";
        }
        button.addEventListener("click", () => {
            impostaNuovoTimer(button.innerText);
        });
        div.appendChild(button);
    }

    return div;
}

function impostaNuovoTimer(val: string) {
    if (val) {
        val === "00:45" && null;
        val === "01:00" && impostaOneMin();
        val === "01:30" && impostaOneMin30();
    }
    confermaSceltaTempo(val);
    nascondiOptions();
}

function impostaOneMin() {
    util.minSn = 0;
    util.minDx = 1;
    util.secSn = 0;
    util.secDx = 0;
}

function impostaOneMin30() {
    util.minSn = 0;
    util.minDx = 1;
    util.secSn = 3;
    util.secDx = 0;
}

export function nascondiOptions() {
    console.log("sono qui dentro ");
    const btnTimeContainer = document.querySelector(".btnTimeContainer");
    btnTimeContainer?.classList.add("d-none");
}

function confermaSceltaTempo(val: string) {
    const pTime = document.querySelector(".pStyle");
    if (pTime) {
        pTime.innerHTML = `Hai selezionato: ${val} `;
        pTime.classList.remove("vibrate");
        pTime.classList.add("bigger");
    }
}
