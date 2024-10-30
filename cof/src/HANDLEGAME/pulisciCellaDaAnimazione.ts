export async function removeAnimationClass(divCell: Element) {
    try {
        divCell && divCell.classList.remove("flip-cell");
    } catch (er) {
        console.error(er);
    }
}
