document.addEventListener('DOMContentLoaded', (event) => {
    const upBtn = document.querySelector('.up-btn');
    window.addEventListener('scroll', () => {
        if(scrollY > 100) {
            upBtn.style.display = 'block';
        } else {
            upBtn.style.display = 'none';
        }
    });

    upBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    })
});