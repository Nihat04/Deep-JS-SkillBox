document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.querySelector('.js-dropdown-menu');
    const links = document.querySelectorAll('a');

    dropdownBtn.addEventListener('click', () => {
        if(dropdownMenu.style.display === 'block') {
            document.removeEventListener('click', closeDropdownMenu);
        } else {
            dropdownMenu.style.display = 'block'
            document.addEventListener('click', closeDropdownMenu);
        }
    })

    function closeDropdownMenu(event) {
        if(!dropdownMenu.contains(event.target) && event.target !== dropdownBtn) {
            dropdownMenu.style.display = 'none';
        }    
    }

    for(link of links) {
        link.addEventListener('click', (event) => event.preventDefault())
    }
});