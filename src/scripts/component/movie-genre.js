class MovieGenre extends HTMLElement {
    /**
     * @param {any} genres
     */
    set genres(genres) {
        this._genres = genres;
        this.render();
    }

    /**
     * @param {any} event
     */
     set clickEvent(event) {
        this._clickEvent = event;
    }
  
    render() {
        this._genres.forEach(Genre => {
            this.innerHTML += `
            <button class="btn btn-primary mr-4" id="filterButtonElement" type="submit" value="${Genre.id}" onmouseover="change(${Genre.id})">${Genre.name}</button>
            `
        });

        const button = document.querySelectorAll("#filterButtonElement");

        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener("click", this._clickEvent);
        }
    }
}

customElements.define("movie-genre", MovieGenre);