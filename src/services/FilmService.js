import { baseService } from "./baseService";

class FilmService extends baseService {
  getPopularMovies = () => {
    return this.get("movie/popular");
  };

  getPopularTV = () => {
    return this.get("tv/popular");
  };


  getPopularTrailer = (type,movieId) => {
    return this.get(`${type}/${movieId}/videos`);
  };

  getTrending = (mediaType, timeWindow) => {
    //mediaType: tv, movie, all, person
    //timeWindow: day, week 

    return this.get(`trending/${mediaType}/${timeWindow}`);
  };
}

export const filmService = new FilmService();
