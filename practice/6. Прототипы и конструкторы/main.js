const input = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const prototypesList = document.querySelector(".result-list");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const val = "HTMLInputElement";
    const inputValue = input.value;

    prototypesList.innerHTML = '';

    obj = window[inputValue];

    if(!obj) {
        input.classList.add()
        return;
    }

    while (true) {
        const prototype = Object.getPrototypeOf(obj);
        if (!prototype) break;
        const prototypeName = prototype.constructor.name;

        const prototypeItem = renderPrototypeListItem(prototypeName);
        const methodsList = document.createElement("ol");

        for (method of Object.keys(obj)) {
            const methodItem = document.createElement("li");
            methodItem.textContent = method;
            methodsList.append(methodItem);
        }

        prototypeItem.append(methodsList);
        prototypesList.append(prototypeItem);

        obj = prototype;
    }
});

function getPrototypeMethods(prototype) {
    console.log(prototype);
}

function renderPrototypeListItem(prototypeName) {
    const newListItem = document.createElement('li');
    const newListHeader = document.createElement("h3");
    newListHeader.textContent = prototypeName;
    newListItem.append(newListHeader);
    return newListItem;
}
