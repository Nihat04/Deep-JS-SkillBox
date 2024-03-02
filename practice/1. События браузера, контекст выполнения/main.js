document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.querySelector('.js-dropdown-menu');

    dropdownBtn.addEventListener('click', () => {
        dropdownMenu.style.display = 'block'
    })
});

document.addEventListener('click', event => {
    console.log(event);
})