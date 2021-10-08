import LocalStorage from './../data/local-storage.js'

class Modal extends HTMLElement{
    /**
     * @param {any} movies
     */
     set movies(movies) {
        this._movies = movies;
        this.render();
    }
  
    render() {
        this._movies.forEach(Movie => {
            this.innerHTML += `
            <div class="modal fade bd-example-modal-lg" id="exampleModal${Movie.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${Movie.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        ${LocalStorage.getMovieFavorite().find(o => o.backdrop_path == Movie.backdrop_path) != null ||
                            LocalStorage.getMovieList().find(o => o.backdrop_path == Movie.backdrop_path) != null ?
                            "<img src='"+Movie.backdrop_path+"' style='width:100%'>"
                            :  
                            Movie.backdrop_path != null ? 
                                "<img src='https://image.tmdb.org/t/p/w500"+Movie.backdrop_path+"' style='width:100%'>"
                                :
                                "<img src='https://lightwidget.com/wp-content/uploads/local-file-not-found.png' style='height:65%;'>"        
                        }
                        <p><b>Sinopsis : </b>${Movie.overview}</p>
                        </div>
                        <div class="modal-footer">
                        <p>Rating : ${Movie.vote_average} / 10</p>
                        </div>
                    </div>
                </div>
            </div>`
        });
        
        }
}

customElements.define("modal-detail", Modal);