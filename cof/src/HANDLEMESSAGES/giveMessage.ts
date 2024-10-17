export function giveMessage(message: string) {
    const divMessage = document.querySelector(".welcome");
    if (divMessage) {
        divMessage.innerHTML = message;
    }
}
