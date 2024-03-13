export function getFilm(id = '') {
    if(!id) {
        return getDataFromUrl(`https://swapi.py4e.com/api/films`).then(res => res.results);
    }
    
    return getDataFromUrl(`https://swapi.py4e.com/api/films/${id}`);
}

export function getDataFromUrl(url) {
    return fetch(url).then(res => res.json());
}