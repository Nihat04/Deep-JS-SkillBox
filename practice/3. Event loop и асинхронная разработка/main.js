import { renderCorePage, renderFilmDetailsPage } from "./components/view.js";

if(!location.search) {
    renderCorePage().then(res => document.body.append(res));
} else {
    renderFilmDetailsPage().then(res => document.body.append(res));
}