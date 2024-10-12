// crea la griglia contenente tutte le celle necessarie al gioco

// MAIN FUNCTION
export function createGriglia(main: HTMLElement) {
    const cellContainer = document.createElement("div");
    cellContainer.classList.add("cellsContainers");
    for (let i = 0; i < 1978; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add(`c${i}`);

        // cell.addEventListener("click", () => {
        //     selectCell(i);
        // });

        if (i < 989) {
            cell.classList.add("red");
        } else {
            cell.classList.add("blue");
        }

        cellContainer.appendChild(cell);
    }
    main.appendChild(cellContainer);
}
