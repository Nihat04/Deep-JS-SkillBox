import { getFilmData, renderFilm, renderFilmById } from "./components/films-manager.js";
import { renderCorePage, renderFilmDetailsPage } from "./components/view.js";

if(!location.search) {
    renderCorePage().then(res => document.body.append(res));
} else {
    renderFilmDetailsPage().then(res => document.body.append(res));
}