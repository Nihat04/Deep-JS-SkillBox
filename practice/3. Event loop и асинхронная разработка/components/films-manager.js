 export function getFilmData(id) {
    return fetch(`https://swapi.py4e.com/api/films/${id}`)
                .then(response => response.json());
}

function getFilmsData() {
    return fetch('https://swapi.py4e.com/films')
                .then(response => response.json())
                .then(response => response.results);
}

export function renderFilm(filmData) {
    const newDiv = document.createElement('div');
    console.log(filmData)
    newDiv.innerHTML = `
        <h2>Star Wars: Episode ${filmData.episode_id} - ${filmData.title}</h2>
        <p>${filmData.opening_crawl}</p>
        <div>
            <div>
                <h3>Planets</h3>
                <ul>
                    ${renderListWithContent(filmData.planets)}
                </ul>
            </div>
            <div>
                <h3>Species</h3>
                <ul>
                    ${renderListWithContent(filmData.species)}
                </ul>
            </div>
        </div>
        <button>Back to episodes</button>
    `
    return newDiv;
}

export async function renderFilmById(filmId) {
    const data = await getFilmData(filmId);
    return renderFilm(data);
}

function renderListWithContent(arr) {
    const list = document.createElement('ul');
    for(const el of arr) {
        const newListItem = document.createElement('li');
        const elData = fetch(el)
            .then(response => response.json())
            .then(response => newListItem.textContent = response.name);
        list.append(newListItem);
    }
    return list.innerHTML;
}