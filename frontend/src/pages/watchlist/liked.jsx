import { useEffect, useState } from "react";
import { HideDrop, Like, LikedItems, ShowDrop, Watch_list } from "../../components/endPoints";
import { FaAngleUp, FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import "./watchlist.css";
import { MoviesDetail } from "../../components/detail/moviesDetail";
import { SeriesDetail } from "../../components/detail/serieDetail";

export function Liked() {
  const [movieId, setMovieId] = useState(null);
  const [liked, setLiked] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    LikedItems(userId, setLiked, setWatchlist);
  }, [userId]);

  const selectedMovie = liked.find((e) => e.id === movieId); // find movie in liked list

  return (
    <div className="itemContainer">
      {movieId !== null && selectedMovie && (
        selectedMovie.media_type !== "tv"
          ? <MoviesDetail
              id={movieId}
              movieData={selectedMovie} // pass full data
              onClose={() => setMovieId(null)}
              liked={liked}
              setLiked={setLiked}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          : <SeriesDetail
              id={movieId}
              movieData={selectedMovie} // pass full data
              onClose={() => setMovieId(null)}
              liked={liked}
              setLiked={setLiked}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
      )}

      <h1>Liked</h1>
      <div className="itemGrid">
        {liked.map((movie) => (
          <div
            className="itemCard"
            key={movie.id}
            onMouseEnter={e => ShowDrop(e)}
            onMouseLeave={e => HideDrop(e)}
          >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title || movie.name} />
            <div className="dropUp">
              <section>
                <div
                  style={{ color: liked.some(e => e.id === movie.id) ? "red" : "" }}
                  onClick={async () => {
                    await Like(movie, userId);
                    await LikedItems(userId, setLiked, setWatchlist);
                  }}
                >
                  <FaHeart />
                </div>
                <div
                  onClick={async () => {
                    await Watch_list(movie, userId);
                    await LikedItems(userId, setLiked, setWatchlist);
                  }}
                >
                  {watchlist.some(e => e.id === movie.id) ? <FaMinus /> : <FaPlus />}
                </div>
              </section>
              <div onClick={() => setMovieId(movie.id)}>
                <FaAngleUp />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}