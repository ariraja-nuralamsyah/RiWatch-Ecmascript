import LocalStorage from './../data/local-storage.js'

class MovieItem extends HTMLElement {
    /**
     * @param {any} movie
     */
    set movie(movie) {
        this._movie = movie;
        this.render();
    }
  
    render() {
        this.innerHTML += `
            <div class="card" style="height:350px;">
                <div class="card-body" style="text-align:center;">
                    ${LocalStorage.getMovieFavorite().find(o => o.backdrop_path == this._movie.backdrop_path) != null ||
                        LocalStorage.getMovieList().find(o => o.backdrop_path == this._movie.backdrop_path) != null ?
                        "<img src='"+this._movie.backdrop_path+"' style='width:100%'>"
                        :  
                        this._movie.backdrop_path != null ? 
                            "<img src='https://image.tmdb.org/t/p/w500"+this._movie.backdrop_path+"' style='width:100%'>"
                            :
                            "<img src='https://lightwidget.com/wp-content/uploads/local-file-not-found.png' style='height:65%;'>"        
                    }
                    <h5>${this._movie.title}</h5>
                    <h4 hidden>${this._movie.overview}</h4>
                    <h3 hidden>${this._movie.vote_average}</h3>
                    <div class="row d-flex justify-content-center">  
                        <button type="button" class="btn btn-danger button-detail" id='${this._movie.id}' data-toggle='modal' data-target='#exampleModal${this._movie.id}'">Detail</button>
                    ${LocalStorage.getMovieFavorite().find(o => o.title == this._movie.title) != null ? 
                        "<button type='button' class='btn btn-success ml-3 button-remove' id='"+this._movie.id+"'>Remove at Favorite</button>"
                    :
                        "<button type='button' class='btn btn-success ml-3 button-fav' id='"+this._movie.id+"'>Add to Favorite</button>"
                    }
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("movie-item", MovieItem);