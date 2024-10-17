import { util } from "../main";

export function handleMessages() {
    const welcomeText = document.querySelector(".welcome");
    const button = document.getElementById("mainBtn");
    if (welcomeText) {
        welcomeText.innerHTML = "default text";
    }

    if (!button) {
        return;
    }

    if (util.isGameStarted) {
        button.innerHTML = "STOP THE GAME 🖐";
    } else if (!util.isGameStarted) {
        button.innerHTML = "RESUME THE GAME 👍";
    }
}
