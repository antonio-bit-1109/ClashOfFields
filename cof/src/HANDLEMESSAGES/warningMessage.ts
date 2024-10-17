export function giveWarningMessage(string: string) {
    const warning_Par = document.querySelector(".warning");
    if (warning_Par) {
        warning_Par.classList.add("vibrate");
        warning_Par.classList.remove("d-none");
        warning_Par.innerHTML = string;
        setTimeout(() => {
            warning_Par.classList.add("d-none");
            warning_Par.classList.remove("vibrate");
        }, 1000);
    }
}
