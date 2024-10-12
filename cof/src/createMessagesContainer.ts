export function createMessagesContainer(main: HTMLElement) {
    const messageBox = document.createElement("section");
    messageBox.classList.add("messagebox");
    main.appendChild(messageBox);
}
