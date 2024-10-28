// MAIN FUNCTION
export function createAside(main: HTMLElement) {
    const aside = document.createElement("aside");
    main.appendChild(aside);
    aside.classList.add("aside");
    createBoxes(aside);
}

// crea i 4 boxes che conterranno le 4 armi disponibili
function createBoxes(aside: HTMLElement) {
    let box: any;
    for (let i = 0; i < 3; i++) {
        box = document.createElement("div");
        box.classList.add("styleAsideBox");

        ((box) => {
            box.addEventListener("click", () => {
                giveSelectedToBox(box);
            });
        })(box);

        showWeaponsInAside(box, i);
        aside.appendChild(box);
    }
}

function giveSelectedToBox(Selectedbox: HTMLElement) {
    const allBoxes = document.querySelectorAll(".styleAsideBox");
    allBoxes.forEach((box) => {
        box.classList.remove("selected");
    });
    Selectedbox.classList.add("selected");
    // !box.classList.contains("selected") ? box.classList.add("selected") : box.classList.remove("selected");
}

function showWeaponsInAside(box: HTMLElement, i: number) {
    const vetrina = document.createElement("div");
    vetrina.classList.add(`vetrina`);
    const nome = document.createElement("h4");
    nome.classList.add("stileNome");
    vetrina.appendChild(nome);
    switch (i) {
        case 0:
            nome.innerHTML = `🚀 Missle 🚀`;
            createWepon(vetrina, "./imgs/missle.png");
            weaponCost(vetrina, 3);
            break;
        case 1:
            nome.innerHTML = `🧬 Laser 🧬`;
            createWepon(vetrina, "./imgs/laser.png");
            weaponCost(vetrina, 2);
            break;
        case 2:
            nome.innerHTML = `🔨 Martello 🔨`;
            createWepon(vetrina, "./imgs/martello.webp");
            weaponCost(vetrina, 3);
            break;

        default:
            null;
            break;
    }

    box.appendChild(vetrina);
}

function createWepon(vetrina: HTMLElement, path: string) {
    const weapon: HTMLImageElement = document.createElement("img");
    weapon.src = path;
    weapon.classList.add("imgCompact");
    vetrina.appendChild(weapon);
}

function weaponCost(vetrina: HTMLElement, batteryCost: number) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapperBatteryCost");
    for (let i = 0; i < batteryCost; i++) {
        const box = document.createElement("div");
        box.classList.add("batteryCost");
        // vetrina.appendChild(box);
        wrapper.appendChild(box);
    }
    vetrina.appendChild(wrapper);
}
