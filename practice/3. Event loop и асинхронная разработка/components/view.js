import { getFilm, getPLanet, getSpecies } from './api.js'

export async function renderCorePage() {
    const filmsList = document.createElement('ul');
    filmsList.classList.add('films-list');

    const filmsData = await getFilm();

    for(const i in filmsData) {
        const filmId = parseInt(i) + 1;

        const filmsItem = document.createElement('li');
        const filmHeader = document.createElement('h2');
        const filmReleaseId = document.createElement('p');

        filmsItem.classList.add('films-item');

        filmHeader.textContent = `Star Wars: Episode ${filmsData[i].episode_id} - ${filmsData[i].title}`;
        filmReleaseId.textContent = `movie serial number: ${filmId}`
        
        filmsItem.addEventListener('click', (e) => {
            e.preventDefault();
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('filmId', filmId);
            location.search = urlParams;
        });

        filmsItem.append(filmHeader, filmReleaseId);
        filmsList.append(filmsItem);
    }
    
    return filmsList;
}

export async function renderFilmDetailsPage() {
    const searchParams = new URLSearchParams(location.search);
    const filmData = await getFilm(searchParams.get('filmId'));

    const filmContainer = document.createElement('div');
    const filmTitle = document.createElement('h2');
    const filmDescription = document.createElement('p');
    const filmExtras = document.createElement('div');

    const filmPlanets = document.createElement('div');
    const filmPlanetsHeader = document.createElement('h3');
    const filmPlanetsList = renderListWithContent(filmData.planets);

    const filmSpecies = document.createElement('div');
    const filmSpeciesHeader = document.createElement('h3');
    const filmSpeciesList = renderListWithContent(filmData.species);

    filmTitle.textContent = `Star Wars: Episode ${filmData.episode_id} - ${filmData.title}`;
    filmDescription.textContent = filmData.opening_crawl;

    filmPlanetsHeader.textContent = 'Planets';
    filmSpeciesHeader.textContent = 'Species';

    filmPlanets.append(filmPlanetsHeader, filmPlanetsList);
    filmSpecies.append(filmSpeciesHeader, filmSpeciesList);

    filmExtras.append(filmPlanets, filmSpecies);
    filmContainer.append(filmTitle, filmDescription, filmExtras);

    return filmContainer;
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
    return list;
}