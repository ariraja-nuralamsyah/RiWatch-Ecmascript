const axios = require('axios').default;

class DataSource {
    static async searchMovie(keyword,api) {
        return await (await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${keyword}`)).data.results;
    }

    static async filterMovie(filter,api){
        return await (await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api}&with_genres=${filter}`)).data.results;
    }
}

export default DataSource;