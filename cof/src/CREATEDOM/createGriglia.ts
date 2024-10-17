// crea la griglia contenente tutte le celle necessarie al gioco

// MAIN FUNCTION
export function createGriglia(main: HTMLElement) {
    const cellContainer = document.createElement("div");
    cellContainer.classList.add("cellsContainers");
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
