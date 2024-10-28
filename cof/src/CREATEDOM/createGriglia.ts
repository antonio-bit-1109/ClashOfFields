// crea la griglia contenente tutte le celle necessarie al gioco

// MAIN FUNCTION
export function createGriglia(main: HTMLElement) {
    const cellContainer = document.createElement("div");
    cellContainer.classList.add("cellsContainers");
    // creo elemento velo che servirà per non rendere toccabile la griglia se il gioco è in pausa.
    const velo = document.createElement("div");
    velo.classList.add("velo");
    velo.classList.add("d-none");
    // velo.innerText = "PAUSA";

    const textInnerVelo = document.createElement("p");
    textInnerVelo.classList.add("veloText");
    textInnerVelo.innerText = "PAUSA";
    velo.appendChild(textInnerVelo);

    cellContainer.appendChild(velo);
    for (let i = 0; i < 1978; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add(`c${i}`);

        if (i >= 0 && i <= 42) {
            cell.classList.add("b");
            cell.classList.add("strong-red");
        }

        if (i >= 1935 && i <= 1977) {
            cell.classList.add("b");
            cell.classList.add("strong-blue");
        }

        if (i % 43 === 0) {
            cell.classList.add("b");
            i <= 946 ? cell.classList.add("strong-red") : cell.classList.add("strong-blue");
        }

        if ((i - 42) % 43 === 0) {
            cell.classList.add("b");
            i >= 1031 ? cell.classList.add("strong-blue") : cell.classList.add("strong-red");
        }

        if (i < 989 && !cell.classList.contains("b")) {
            cell.classList.add("red");
        }
        if (i >= 989 && !cell.classList.contains("b")) {
            cell.classList.add("blue");
        }

        cellContainer.appendChild(cell);
    }
    main.appendChild(cellContainer);
}
