export function eliminaCorpoArma(cell: Element) {
    const regexClasseCorpoArma = /^[Cc]orpo/;
    cell.classList.forEach((className) => {
        if (regexClasseCorpoArma.test(className)) {
            // Se la classe inizia con "corpo" o "Corpo", rimuovila
            cell.classList.remove(className);
        }
    });
}
