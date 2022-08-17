import React, { Fragment, useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
//Mine
import "./Home.css";
import FilmCarousel from "../../components/FilmCarousel/FilmCarousel";
import {
  displayPopularCarouselAction,
  getTrailersPopularAction,
  getPopularMoviesAction,
  displayPopularTrailerCarouselAction,
  displayTrendingCarouselAction,
} from "../../redux/actions/CarouselAction";
import { Switch, Button, Modal } from "antd";
export default function Home() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { popular, trending } = useSelector((state) => state.CarouselReducer);

  useEffect(() => {
    dispatch(getPopularMoviesAction());
    dispatch(getTrailersPopularAction(popular));
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeCarousel = (e) => {
    console.log(e);
    //false = tv, true = theaters
    if (e === false) {
      dispatch(displayPopularCarouselAction("tv"));
    } else {
      dispatch(displayPopularCarouselAction("movie"));
    }
  };

  return (
    <Fragment>
      <header
        className="header py-5"
        style={{ backgroundColor: "rgb(3,37,65)" }}
      >
        <nav className="container mx-auto px-9">
          <ul
            className="flex gap-x-3 text-white text-sm font-semibold"
            style={{ fontSize: "16px" }}
          >
            <li>
              <a className="link mr-3 flex" href="http://localhost:3000/">
                <img
                  className="w-full"
                  style={{ width: "135px" }}
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                  alt="..."
                />
              </a>
            </li>
            <li>
              <a className="link mr-4 text-white" href="http://localhost:3000/">
                Movies
              </a>
            </li>
            <li>
              <a className="link mr-4 text-white" href="http://localhost:3000/">
                TV Shows
              </a>
            </li>
            <li>
              <a className="link mr-4 text-white" href="http://localhost:3000/">
                People
              </a>
            </li>
            <li>
              <a className="link mr-4 text-white" href="http://localhost:3000/">
                More
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="home-banner">
        <div className="content-wrapper container mx-auto pt-12 pb-14 px-10 bg-center bg-no-repeat bg-cover">
          <div className="heading text-white">
            <h1 className="first text-5xl font-bold text-white">Welcome.</h1>
            <h1 className="second text-3xl font-semibold mb-8 text-white">
              Millions of movies, TV shows and people to discover. Explore now.
            </h1>
            <div className="relative mx-auto text-gray-600">
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 py-5 pr-16 rounded-full text-lg focus:outline-none w-full"
                type="search"
                name="search"
                placeholder="Search for a movie, tv show, person......"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-blue-300 h-full px-7 text-white font-semibold bg-gradient-to-r from-green-3  00 to-blue-400"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="sliders mt-5">
        <div className="slider-popular container mx-auto px-6">
          <div className="heading flex items-center mb-4">
            <h1 className="text-2xl font-semibold">What's Popular</h1>
            <div className="types ml-5 text-lg">
              <Switch
                className="switch"
                unCheckedChildren={
                  <span className="text-right block">ON TV</span>
                }
                checkedChildren={
                  <span className="text-left block">In Theaters</span>
                }
                onChange={handleChangeCarousel}
              />
            </div>
          </div>
          {popular.displaying === "tv" ? (
            <FilmCarousel films={popular.tv} />
          ) : (
            <FilmCarousel films={popular.movies} />
          )}
        </div>
        <div
          className="slider-trailers container mx-auto px-6 bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${trending.displayingImage})`,
            transition: "all 0.2s linear",
          }}
        >
          <div className="heading flex items-center mb-4">
            <h1 className="text-2xl font-semibold">Latest Trailers</h1>
            <div className="types ml-5 text-lg">
              <Switch
                className="switch"
                unCheckedChildren={
                  <span className="text-right block">ON TV</span>
                }
                checkedChildren={
                  <span className="text-left block">In Theaters</span>
                }
                onChange={(e) => {
                  if (e === false) {
                    dispatch(displayPopularTrailerCarouselAction("tv"));
                  } else {
                    dispatch(displayPopularTrailerCarouselAction("movie"));
                  }
                }}
              />
            </div>
          </div>

          {popular.displayingTrailerType === "tv" ? (
            <FilmCarousel
              films={popular.trailersTv}
              carouselType="trailers"
              backgroundTrailer={popular.backgroundTrailer}
              showModal={showModal}
              type="tv"
            />
          ) : (
            <FilmCarousel
              films={popular.trailersMovies}
              carouselType="trailers"
              backgroundTrailer={popular.backgroundTrailer}
              showModal={showModal}
              type="movie"
            />
          )}

          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            className="modal-trailer"
            destroyOnClose={true}
          >

            <iframe
              src={`https://www.youtube.com/embed/${popular.displayingTrailerVideoKey}`}
              title="The Sandman | The World of The Endless | Netflix"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              className="trailer"
            ></iframe>
          </Modal>
        </div>

        <div
          className="slider-trending container mx-auto px-6 background-image-slider bg-contain bg-bottom bg-opacity-10"
          style={{
            backgroundImage:
              "url('https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg')",
            backgroundPositionY: "150%",
          }}
        >
          <div className="heading flex items-center mb-4">
            <h1 className="text-2xl font-semibold">Trending</h1>
            <div className="types ml-5 text-lg">
              <Switch
                className="switch"
                unCheckedChildren={
                  <span className="text-right block">Today</span>
                }
                checkedChildren={
                  <span className="text-left block">This Week</span>
                }
                onChange={(e) => {
                  if (e === false) {
                    dispatch(displayTrendingCarouselAction("today"));
                  } else {
                    dispatch(displayTrendingCarouselAction("week"));
                    console.log("len");
                  }
                }}
              />
            </div>
          </div>
          {trending.displaying === "today" ? (
            <FilmCarousel
              films={trending.today.movies}
              carouselType="trending"
            />
          ) : (
            <FilmCarousel
              films={trending.week.movies}
              carouselType="trending"
            />
          )}
        </div>
      </section>
    </Fragment>
  );
}
