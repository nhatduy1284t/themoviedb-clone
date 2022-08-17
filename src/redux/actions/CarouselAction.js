import { filmService } from "../../services/FilmService";

export const getPopularMoviesAction = () => {
  return async (dispatch) => {
    try {
      let responseMovies = await filmService.getPopularMovies();
      let responsePopularTV = await filmService.getPopularTV();
      let responseTrendingToday = await filmService.getTrending("movie", "day");
      let responseTrendingWeek = await filmService.getTrending("movie", "week");
      console.log(responseTrendingToday);
      //dispatch to redux store
      dispatch({
        type: "GET_CAROUSEL",
        payload: {
          popular: {
            movies: responseMovies.data,
            tv: responsePopularTV.data,
          },
          trending: {
            today: {
              movies: responseTrendingToday.data,
            },
            week: {
              movies: responseTrendingWeek.data,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const displayPopularCarouselAction = (category) => {
  return {
    type: "CHANGE_CAROUSEL_POPULAR",
    payload: category,
  };
};

export const displayPopularTrailerCarouselAction = (category) => {
  return {
    type: "CHANGE_TRAILER_CAROUSEL_POPULAR",
    payload: category,
  };
};

export const displayTrendingCarouselAction = (category) => {
  return {
    type: "CHANGE_TRENDING_CAROUSEL",
    payload: category,
  };
};

export const displayBackgroundTrailerCarouselAction = (imgUrl) => {
  return {
    type: "CHANGE_BACKGROUND_TRAILER_CAROUSEL",
    payload: imgUrl,
  };
};

export const getTrailersPopularAction = (films) => {
  return async (dispatch) => {
    try {
      // let res = await filmService.getPopularTrailerTV();
      // let res = await filmService.getPopularTrailerMovie();
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTrailerAction = (type, filmId) => {
  return async (dispatch) => {
    try {
      let result = await filmService.getPopularTrailer(type, filmId);

      dispatch({
        type: "GET_TRAILER",
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
