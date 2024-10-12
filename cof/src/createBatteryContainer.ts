export function createBatteryContainer(main: HTMLElement) {
    const batteryContainer = document.createElement("div");
    batteryContainer.classList.add("batteryContainer");
    createSlotBattery(batteryContainer);
    main.appendChild(batteryContainer);
}

function createSlotBattery(batteryContainer: HTMLElement) {
    let slot: any;
    for (let i = 0; i < 6; i++) {
        slot = document.createElement("div");
        slot.classList.add("styleSlot");
        slot.classList.add("slot");
        batteryContainer.appendChild(slot);
    }
}
