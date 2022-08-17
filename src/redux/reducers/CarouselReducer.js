const initialState = {
  popular: {
    displaying: "tv",
    movies: [],
    tv: [],
    trailersMovies: [],
    trailersTv: [],
    displayingTrailerType: "tv",
    backgroundTrailer: "",
    displayingTrailerVideoKey: "",
  },
  trending: {
    displaying: "today",
    displayingImage: "",
    today: {
      movies: [],
      tv: [],
    },
    week: {
      movies: [],
      tv: [],
    },
  },
};

export const CarouselReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CAROUSEL": {
      let { popular, trending } = action.payload;
      state.popular.movies = popular.movies.results;
      state.popular.tv = popular.tv.results;
      state.popular.trailersMovies = popular.movies.results;
      state.popular.trailersTv = popular.tv.results;
      state.trending.today.movies = trending.today.movies.results;
      state.trending.week.movies = trending.week.movies.results;

      return { ...state };
    }
    case "CHANGE_CAROUSEL_POPULAR": {
      let category = action.payload;
      state.popular.displaying = category;

      return { ...state };
    }
    case "CHANGE_TRAILER_CAROUSEL_POPULAR": {
      let category = action.payload;
      state.popular.displayingTrailerType = category;

      return { ...state };
    }
    case "CHANGE_TRENDING_CAROUSEL": {
      let category = action.payload;
      state.trending.displaying = category;

      return { ...state };
    }
    case "CHANGE_BACKGROUND_TRAILER_CAROUSEL": {
      let imgUrl = action.payload;
      state.trending.displayingImage = imgUrl;

      return { ...state };
    }

    case "GET_TRAILER": {
      let videos = action.data.results;

      if (videos.length >= 1) {
        //get the first video because it's the latest
        
        state.popular.displayingTrailerVideoKey = videos[0].key;
      }

      return { ...state };
    }
    default:
      return state;
  }
};
