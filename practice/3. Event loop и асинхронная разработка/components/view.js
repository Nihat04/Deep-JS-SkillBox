import { getFilm, getDataFromUrl } from './api.js'

export async function renderCorePage() {
    const filmsList = document.createElement('ul');
    filmsList.classList.add('films-list');

    const filmsData = await getFilm();

    for(const i in filmsData) {
        const filmId = parseInt(i) + 1;

        const filmsItem = document.createElement('li');
        const filmLink = document.createElement('a');
        const filmHeader = document.createElement('h2');
        const filmReleaseId = document.createElement('p');

        filmsItem.classList.add('films-item');

        filmHeader.textContent = `Star Wars: Episode ${filmsData[i].episode_id} - ${filmsData[i].title}`;
        filmReleaseId.textContent = `movie release id: ${filmId}`
        
        filmLink.addEventListener('click', (e) => {
            e.preventDefault();
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('filmId', filmId);
            location.search = urlParams;
        });

        filmLink.append(filmHeader, filmReleaseId);
        filmsItem.append(filmLink);
        filmsList.append(filmsItem);
    }
    
    return filmsList;
}

export async function renderFilmDetailsPage() {
    const searchParams = new URLSearchParams(location.search);
    const filmData = await getFilm(searchParams.get('filmId'));

    const contentElement = document.createElement('div');

    const filmContainer = document.createElement('div');
    const backBtn = document.createElement('button');

    const filmTitle = document.createElement('h2');
    const filmDescription = document.createElement('p');
    const filmExtras = document.createElement('div');

    const filmPlanets = document.createElement('div');
    const filmPlanetsHeader = document.createElement('h3');
    const filmPlanetsList = renderListWithContent(filmData.planets);

    const filmSpecies = document.createElement('div');
    const filmSpeciesHeader = document.createElement('h3');
    const filmSpeciesList = renderListWithContent(filmData.species);

    filmContainer.classList.add('film');
    filmTitle.classList.add('film__header');
    filmDescription.classList.add('film__descr');
    filmExtras.classList.add('film__extras');

    filmPlanets.classList.add('film__extras__wrapper');
    filmPlanetsHeader.classList.add('extras__header');
    filmPlanetsList.classList.add('extras__list');

    filmSpecies.classList.add('film__extras__wrapper');
    filmSpeciesHeader.classList.add('extras__header');
    filmSpeciesList.classList.add('extras__list');

    backBtn.classList.add('btn-reset', 'btn');

    filmTitle.textContent = `Star Wars: Episode ${filmData.episode_id} - ${filmData.title}`;
    filmDescription.textContent = filmData.opening_crawl;

    filmPlanetsHeader.textContent = 'Planets';
    filmSpeciesHeader.textContent = 'Species';

    backBtn.textContent = 'Back to episodes';

    backBtn.addEventListener('click', (e) => location.search = '');

    filmPlanets.append(filmPlanetsHeader, filmPlanetsList);
    filmSpecies.append(filmSpeciesHeader, filmSpeciesList);

    filmExtras.append(filmPlanets, filmSpecies);
    filmContainer.append(filmTitle, filmDescription, filmExtras);

    contentElement.append(filmContainer, backBtn);

    return contentElement;
}

function renderListWithContent(arr) {
    const list = document.createElement('ul');
    for(const el of arr) {
        const newListItem = document.createElement('li');
        getDataFromUrl(el).then(response => newListItem.textContent = response.name);
        list.append(newListItem);
    }
    return list;
}