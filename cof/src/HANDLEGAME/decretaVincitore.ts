import { giveMessage } from "../HANDLEMESSAGES/giveMessage";
import { util } from "../main";

import { riavviaPartita } from "./riavviaPartita";

// allo scadere del tempo conto quante celle ha un giocatore e quante il computer e decreto il vincitore.
export function DecretaVincitore() {
    let message = "";
    const allCells = document.querySelectorAll(".cell");
    allCells.forEach((cell) => {
        if (cell.classList.contains("red")) {
            util.redCells++;
        }

        if (cell.classList.contains("blue")) {
            util.blueCell++;
        }

        // cell.classList.contains("blue") ? util.blueCell++ : util.redCells++;
    });

    if (util.blueCell === util.redCells) {
        message = `Incredibile, Parità! 😯  <br> <span style='color:blue'> caselle conquistate: ${util.blueCell}</span> <br> 
        <span style='color:red'>  caselle dell'avversario: ${util.redCells}  </span>`;
    }

    if (util.blueCell > util.redCells) {
        message = `Hai vinto la partita, Complimenti! 🥳 <br> <span style='color:blue'> caselle conquistate: ${util.blueCell}</span> <br> 
      <span style='color:red'>  caselle dell'avversario: ${util.redCells}  </span>`;
    }

    if (util.blueCell < util.redCells) {
        message = `Purtroppo il computer ti ha battuto, Riprova! 😥 <br> <span style='color:blue'> Caselle conquistate: ${util.blueCell} </span> <br> 
       <span style='color:red'> Caselle dell'avversario: ${util.redCells} </span>`;
    }
    giveMessage(message);
    riavviaPartita();
}
