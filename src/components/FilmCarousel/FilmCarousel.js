import React from "react";
import Slider from "react-slick";
import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Progress } from "antd";
import "./FilmCarousel.css";
import { useDispatch } from "react-redux";
import {
  displayBackgroundTrailerCarouselAction,
  getTrailerAction,
} from "../../redux/actions/CarouselAction";
const FilmCarousel = React.memo((props) => {
  const dispatch = useDispatch();
  const { films, carouselType, showModal, type } = props;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: carouselType === "trailers" ? 4 : 8,
    swipeToSlide: true,
    arrows: false,
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Add to list
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              Favorite
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.luohanacademy.com"
            >
              Watchlist
            </a>
          ),
        },
        {
          key: "4",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.luohanacademy.com"
            >
              Your rating
            </a>
          ),
        },
      ]}
    />
  );

  const renderFilms = () => {
    if (carouselType === "trailers") {
      //If trailers carousel
      return films.map((film, i) => {
        return (
          <div
            key={i}
            className="relative"
            onMouseEnter={() => {
              let imgUrl = `https://image.tmdb.org/t/p/w1920_and_h427_multi_faces${film.backdrop_path}`;
              dispatch(displayBackgroundTrailerCarouselAction(imgUrl));
            }}
            onClick={async () => {
              dispatch(getTrailerAction(type, film.id));

              showModal();
            }}
          >
            <div className="px-1 cursor-pointer">
              <div className="ml-0 relative overflow-hidden">
                <img
                  alt="..."
                  src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`}
                  className="w-full px-1 "
                  style={{
                    borderRadius: "10px",
                  }}
                />
                <CaretRightOutlined
                  style={{
                    fontSize: "60px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="absolute opacity-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-125 "
                />
              </div>
              <div className="title text-center">
                <h1 className="font-semibold">{film.title || film.name}</h1>
                <p>{film.first_air_date || film.release_date}</p>
              </div>
            </div>
            <Dropdown overlay={menu} placement="bottom" trigger={"click"}>
              <Button
                className="btn-film absolute top-3 right-5 rounded bg-transparent"
                style={{ position: "absolute" }}
              >
                ...
              </Button>
            </Dropdown>
          </div>
        );
      });
    }
    //Popular and Trending carousel.
    return films.map((film) => {
      return (
        <div key={film} className="relative">
          <div className="film relative">
            <a href="https://localhost:3000" className="ml-0 relative">
              <img
                alt="..."
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                className="w-full px-1 object-cover"
                style={{
                  borderRadius: "10px",
                  width: "150px",
                  height: "225px",
                }}
              />
              <Progress
                className="rating absolute bottom-0 translate-y-1/2 translate-x-1 left-2"
                format={(percent) => (
                  <span className="text-white font-bold">{percent}%</span>
                )}
                type="circle"
                width={30}
                strokeColor={(() => {
                  let voteAverage = Math.floor(film.vote_average * 10);
                  if (voteAverage > 70) {
                    return "#21d07a";
                  } else if (voteAverage < 50) {
                    return "#ff4d4f";
                  }
                  return "#d2d531";
                })()}
                percent={Math.floor(film.vote_average * 10)}
              />
            </a>
            <div className="mt-4">
              <h1 className="font-semibold">{film.title || film.name}</h1>
              <p>{film.first_air_date || film.release_date}</p>
            </div>
          </div>
          <Dropdown overlay={menu} placement="bottom" trigger={"click"}>
            <Button
              className="btn-film absolute top-3 right-5 rounded bg-transparent"
              style={{ position: "absolute" }}
            >
              ...
            </Button>
          </Dropdown>
        </div>
      );
    });
  };

  return <Slider {...settings}> {renderFilms()}</Slider>;
});


export default FilmCarousel;