import DataSource from '../data/data-source.js';
import LocalStorage from '../data/local-storage.js';
import '../component/movie-list.js';
import '../component/movie-genre.js'
import '../component/search-bar.js';

function main() {
    const axios = require('axios').default;
    const baseUrl = "https://api.themoviedb.org/3/movie";
    const apiKey = "9f85f315309fd8607469257a6caf1fd2"
    const searchElement = document.querySelector("search-bar");
    const movieListElement = document.querySelector("movie-list");
    const moviesListGenre = document.querySelector("movie-genre");
    const modalDetail = document.querySelector("modal-detail");
    const berandaButton = document.getElementById("Beranda");
    const historyButton = document.getElementById("History");
    const favoriteButton = document.getElementById("Favorite");
    const genre = document.getElementById("filterElement");
    movieListElement.className = "row";
    moviesListGenre.className = "scrolling-wrapper";
    
    const renderGenre = results => {
        moviesListGenre.genres = results;
    }
    const renderResult = results => {
        movieListElement.movies = results;
        modalDetail.movies = results;
    };

    const onButtonSearchClicked = async () => {
        if(searchElement.value == ""){
            getMovie();
        }
        else{
            const result = await DataSource.searchMovie(searchElement.value,apiKey);
            renderResult(result);
        }
    };

    const onButtonFilterClicked = async () => {
        const genreID = genre.value;
        const result = await DataSource.filterMovie(genreID,apiKey);
        renderResult(result);
    };

    const getMovie = async () => {
        try {
            const responseJson = await (await axios.get(`${baseUrl}/popular?api_key=${apiKey}`)).data;
            console.log(responseJson.results);
            if(responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                berandaButton.className = "row p-1 active";
                historyButton.className = "row p-1";
                favoriteButton.className = "row p-1";
                renderResult(responseJson.results);
            }
        } catch(error) {
            showResponseMessage(error);
        }
    }

    const getMovieHistory = async () => {
        try {
            const responseJson = await LocalStorage.getMovieList();
            if(responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                berandaButton.className = "row p-1";
                historyButton.className = "row p-1 active";
                favoriteButton.className = "row p-1";
                renderResult(responseJson);
            }
        } catch(error) {
            showResponseMessage(error);
        }
    }

    const getMovieFavorite = async () => {
        try {
            const responseJson = await LocalStorage.getMovieFavorite();
            if(responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                berandaButton.className = "row p-1";
                historyButton.className = "row p-1";
                favoriteButton.className = "row p-1 active";
                renderResult(responseJson);
            }
        } catch(error) {
            showResponseMessage(error);
        }
    }

    const getGenre = async () => {
        try {
            const responseJson = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US
            `);
            if(responseJson.data.error) {
                showResponseMessage(responseJson.data.message);
            } else {
                renderGenre(responseJson.data.genres);
            }
        } catch(error) {
            showResponseMessage(error);
        }
    }

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };
   
    getMovie();
    getGenre();
    moviesListGenre.clickEvent = onButtonFilterClicked;
    searchElement.clickEvent = onButtonSearchClicked;
    berandaButton.onclick = getMovie;
    historyButton.onclick = getMovieHistory;
    favoriteButton.onclick = getMovieFavorite;
}

export default main;