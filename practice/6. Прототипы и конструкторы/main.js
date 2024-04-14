const input = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const prototypesList = document.querySelector(".result-list");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const inputValue = input.value;

    prototypesList.innerHTML = '';

    let windowProperty = window[inputValue];
    if(!windowProperty) {
        input.classList.add('invalid')
        return;
    }
    if(input.classList.contains('invalid')) input.classList.remove('invalid');

    if(!typeof windowProperty === 'function') {
        console.log('error')
        return;
    }
    let prototype = windowProperty.prototype;

    while(prototype) {
        const prototypeItem = renderPrototypeListItem(prototype.constructor.name);
        const methodsList = document.createElement('ol');
        
        for(method of Object.keys(prototype)) {
            methodsList.append(renderPrototypeMethodsItem(method))
        }
        
        prototypeItem.append(methodsList);
        prototypesList.append(prototypeItem);
        prototype = Object.getPrototypeOf(prototype);
    }
});

function getPrototypeMethods(prototype) {
    console.log(prototype);
}

function renderPrototypeListItem(prototypeName) {
    const item = document.createElement('li');
    const itemHeader = document.createElement("h4");
    itemHeader.textContent = prototypeName;
    item.append(itemHeader);
    return item;
}

function renderPrototypeMethodsItem(methodName) {
    const item = document.createElement('li');
    item.textContent = methodName;
    return item;
}