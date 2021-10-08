const storageKeyHistory = "RIWATCH_APPS_HISTORY";
const storageKeyFavorite = "RIWATCH_APPS_FAVORITE";

class LocalStorage{
    static putMovieList(data){
        if(typeof(Storage) !== "undefined"){
            let userData = [];
            if (localStorage.getItem(storageKeyHistory) === null) {
                userData = [];
            } else {
                userData = JSON.parse(localStorage.getItem(storageKeyHistory));
            }     
            if (userData.find(o => o.title === data.title)) {
                userData = userData.filter(item => !(item.title == data.title));
            }
            userData.unshift(data); 
            localStorage.setItem(storageKeyHistory, JSON.stringify(userData));   
        }
    }

    static putMovieFavorite(data){
        if(typeof(Storage) !== "undefined"){
            let userData = [];
            if (localStorage.getItem(storageKeyFavorite) === null) {
                userData = [];
            } else {
                userData = JSON.parse(localStorage.getItem(storageKeyFavorite));
            }     
            userData.unshift(data); 
            localStorage.setItem(storageKeyFavorite, JSON.stringify(userData));  
            
            return this.getMovieFavorite();
        }
    }

    static popMovieFavorite(id){
        if(typeof(Storage) !== "undefined"){
            let userData = [];
            if (localStorage.getItem(storageKeyFavorite) === null) {
                userData = [];
            } else {
                userData = JSON.parse(localStorage.getItem(storageKeyFavorite));
            }     
            userData = userData.filter(item => !(item.id == id));
            localStorage.setItem(storageKeyFavorite, JSON.stringify(userData));
            
            return this.getMovieFavorite();
        }
    }

    static getMovieList() {
        if (typeof(Storage) !== "undefined") {
            return JSON.parse(localStorage.getItem(storageKeyHistory)) || [];
        } else {
            return [];
        }
    }
    static getMovieFavorite() {
        if (typeof(Storage) !== "undefined") {
            return JSON.parse(localStorage.getItem(storageKeyFavorite)) || [];
        } else {
            return [];
        }
    }
}

export default LocalStorage;