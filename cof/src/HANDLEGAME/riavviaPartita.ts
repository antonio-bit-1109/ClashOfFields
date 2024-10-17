export function riavviaPartita() {
    const mainBtn = document.getElementById("mainBtn");
    if (mainBtn) {
        mainBtn.innerHTML = "Nuova Partita ▶️";
    }

    mainBtn?.addEventListener("click", () => {
        window.location.reload();
    });
}
