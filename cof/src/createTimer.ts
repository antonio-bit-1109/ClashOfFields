export function createTimer() {
    const messageBox = document.querySelector(".messagebox");
    const timer = document.createElement("div");
    timer.id = "timer";
    timer.classList.add("d-none");
    messageBox?.appendChild(timer);
}
