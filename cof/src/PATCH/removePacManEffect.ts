import { util } from "../main";
// funzione per non far cambiare colore alle celle dall'altro lato della griglia, NO EFFETTO PACMAN!
// SE LA CELLA CLICCATA SI TROVA ADIACENTE AD UNA CELLA DI BORDO "b" TROVA LE CASELLE x+n che compongono l'altro lato della griglia e togli la classe per farla diventare blue , in sostanza mantienila del suo colore originale
export async function Patch_removePacMan_Effect() {
    let esito = removePacManEffect_cellNearBorder();

    esito[0] && console.log("ho cliccato una cella vicino al bordo sinistro");
    esito[1] && console.log("ho cliccato una cella vicino al bordo destro");

    let result = removePacManEffect_cellDistantTwoFromBorder();

    result[0] && console.log("ho cliccato una cella distante n-2 dal bordo");
    result[1] && console.log("ho cliccato una cella distante n+2 dal bordo");
}

function removePacManEffect_cellNearBorder(): boolean[] {
    // return new Promise((res, rej) => {
    const esiti = [];

    // il valore util.raggioAzioneMissile[0] corrisponde alla cella cliccata col mouse, trovo le altre a partire da questa.
    let centerCellValue = util.raggioAzioneArma[0];
    console.log(centerCellValue, "cella centrale ");
    // const centerCell = document.querySelector(`${centerCellValue}`);
    const adiacentCellDx = document.querySelector(`.c${(parseInt(centerCellValue.slice(1)) + 1).toString()}`);
    const adiacentCellSn = document.querySelector(`.c${(parseInt(centerCellValue.slice(1)) - 1).toString()}`);

    if (adiacentCellSn?.classList.contains("b")) {
        console.log("sono qui adiacentCellSn");
        let stringValNoLett = centerCellValue.slice(1);
        let numValue = parseInt(stringValNoLett);

        const otherSideCell_Center = document.querySelector(`.c${numValue - 3}`);
        const adicentCell_center_plus_2 = document.querySelector(`.c${numValue - 4}`);
        const otherSideCell_Top = document.querySelector(`.c${numValue - 46}`);
        const otherSideCell_Bottom = document.querySelector(`.c${numValue + 40}`);

        if (otherSideCell_Center) {
            otherSideCell_Center.classList.remove("blue", "flip-cell");
            otherSideCell_Center.classList.add("red");
        }
        if (adicentCell_center_plus_2) {
            adicentCell_center_plus_2.classList.remove("blue", "flip-cell");
            adicentCell_center_plus_2.classList.add("red");
        }
        if (otherSideCell_Top) {
            otherSideCell_Top.classList.remove("blue", "flip-cell");
            otherSideCell_Top.classList.add("red");
        }
        if (otherSideCell_Bottom) {
            otherSideCell_Bottom.classList.remove("blue", "flip-cell");
            otherSideCell_Bottom.classList.add("red");
        }

        esiti.push(true);
    } else {
        esiti.push(false);
    }

    if (adiacentCellDx?.classList.contains("b")) {
        console.log("sono qui adiacentCellDx");
        let stringValNoLett = centerCellValue.slice(1);
        let numValue = parseInt(stringValNoLett);
        const otherSideCell_Center = document.querySelector(`.c${numValue + 3}`);
        const adicentCell_center_plus_2 = document.querySelector(`.c${numValue + 4}`);
        const otherSideCell_Top = document.querySelector(`.c${numValue + 46}`);
        const otherSideCell_Bottom = document.querySelector(`.c${numValue - 40}`);

        if (otherSideCell_Center) {
            otherSideCell_Center.classList.remove("blue", "flip-cell");
            otherSideCell_Center.classList.add("red");
        }
        if (adicentCell_center_plus_2) {
            adicentCell_center_plus_2.classList.remove("blue", "flip-cell");
            adicentCell_center_plus_2.classList.add("red");
        }
        if (otherSideCell_Top) {
            otherSideCell_Top.classList.remove("blue", "flip-cell");
            otherSideCell_Top.classList.add("red");
        }
        if (otherSideCell_Bottom) {
            otherSideCell_Bottom.classList.remove("blue", "flip-cell");
            otherSideCell_Bottom.classList.add("red");
        }

        esiti.push(true);
    } else {
        esiti.push(false);
    }

    return esiti;
}

function removePacManEffect_cellDistantTwoFromBorder(): boolean[] {
    let esito = [];
    let centerCellValue = util.raggioAzioneArma[0];
    const adiacentCellDx = document.querySelector(`.c${(parseInt(centerCellValue.slice(1)) + 2).toString()}`);
    const adiacentCellSn = document.querySelector(`.c${(parseInt(centerCellValue.slice(1)) - 2).toString()}`);

    if (adiacentCellSn?.classList.contains("b")) {
        console.log("sono qui adiacentCellSn");
        let stringValNoLett = centerCellValue.slice(1);
        let numValue = parseInt(stringValNoLett);

        const otherSideCell = document.querySelector(`.c${numValue - 4}`);

        if (otherSideCell) {
            otherSideCell.classList.remove("blue", "flip-cell");
            otherSideCell.classList.add("red");
        }

        esito.push(true);
    } else {
        esito.push(false);
    }

    if (adiacentCellDx?.classList.contains("b")) {
        console.log("sono qui adiacentCellSn");
        let stringValNoLett = centerCellValue.slice(1);
        let numValue = parseInt(stringValNoLett);

        const otherSideCell = document.querySelector(`.c${numValue + 4}`);

        if (otherSideCell) {
            otherSideCell.classList.remove("blue", "flip-cell");
            otherSideCell.classList.add("red");
        }

        esito.push(true);
    } else {
        esito.push(false);
    }
    return esito;
}
