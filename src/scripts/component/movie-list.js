import './movie-item.js';
import LocalStorage from './../data/local-storage.js'

class MovieList extends HTMLElement {
    /**
     * @param {any} movies
     */
    set movies(movies) {
        this._movies = movies;
        this.render();
    }

    /**
     * @param {any} event
     */
     set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }
  
    render() {
        this.innerHTML = "";
        this._movies.forEach(Movie => {
            const movieItemElement = document.createElement("movie-item");
            movieItemElement.movie = Movie;
            movieItemElement.className = "col-lg-4 col-md-6 col-sm-12 pb-3";
            movieItemElement.style = "margin-top: 12px";
            this.appendChild(movieItemElement);
        });

        const buttonsWatch = document.querySelectorAll(".button-detail");
        let i = 0;
        buttonsWatch.forEach(button => {
            button.addEventListener("click", event => {
                const elements = event.target.parentElement.parentElement;
                const backdrop_path = elements.querySelector("img").src;
                const title = elements.querySelector("h5").innerText;
                const id = event.target.id;
                const overview = elements.querySelector("h4").innerText;
                const vote_average = elements.querySelector("h3").innerText;
                const newWatchMovie = {
                    backdrop_path,
                    title,
                    id,
                    overview,
                    vote_average,
                }
                LocalStorage.putMovieList(newWatchMovie);
            })
        })

        const buttonsFav = document.querySelectorAll(".button-fav");
        buttonsFav.forEach(button => {
            button.addEventListener("click", event => {
                const elements = event.target.parentElement.parentElement;
                const backdrop_path = elements.querySelector("img").src;
                const title = elements.querySelector("h5").innerText;
                const id = event.target.id;
                const overview = elements.querySelector("h4").innerText;
                const vote_average = elements.querySelector("h3").innerText;
                const newWatchMovie = {
                    backdrop_path,
                    title,
                    id,
                    overview,
                    vote_average,
                }
                const film = LocalStorage.putMovieFavorite(newWatchMovie);
                document.getElementById("Beranda").className = "row p-1";
                document.getElementById("History").className = "row p-1";
                document.getElementById("Favorite").className = "row p-1 active";
                this.movies = film;
            })
        })

        const buttonsDel = document.querySelectorAll(".button-remove");
        buttonsDel.forEach(button => {
            button.addEventListener("click", event => {
                const id = event.target.id;
                const film = LocalStorage.popMovieFavorite(id);
                document.getElementById("Beranda").className = "row p-1";
                document.getElementById("History").className = "row p-1";
                document.getElementById("Favorite").className = "row p-1 active";
                this.movies = film;
            })
        })
        
    }

    renderError(message) {
        this.innerHTML = `
        <style>
            .placeholder {
                font-weight: lighter;
                color: rgba(0,0,0,0.5);
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
        </style>
        `;
        this.innerHTML += `<h2 class="placeholder">${message}</h2>`;
    }
}

customElements.define("movie-list", MovieList);