export function getFilm(id = '') {
    if(!id) {
        return getDataFromUrl(`https://swapi.py4e.com/api/films/${id}`).then(res => res.results);
    }
    
    return getDataFromUrl(`https://swapi.py4e.com/api/films/${id}`);
}

export function getPLanet(id = '') {
    return getDataFromUrl(`https://swapi.py4e.com/api/planets/${id}`);
}

export function getSpecies(id = '') {
    return getDataFromUrl(`https://swapi.py4e.com/api/species/${id}`);
}

function getDataFromUrl(url) {
    return fetch(url).then(res => res.json());
}