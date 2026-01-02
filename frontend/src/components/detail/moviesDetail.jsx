import { useEffect, useRef, useState } from "react";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { Like, LikedItems, Watch_list } from "../endPoints";
import { PopUp } from "../popUp/popUp";
import "./detail.css";
import { getMovieDetails } from "../../pages/movies/api/movie-api";
import { Buttons } from "../../ui/button";

export function MoviesDetail({ id, onClose, liked = [], setLiked, watchlist = [], setWatchlist }) {
  const [movie, setMovie] = useState(null);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");
  const detailRef = useRef(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  useEffect(() => {
    // Only call if setters exist
    if (userId ) {
      LikedItems(userId, setLiked, setWatchlist);
    }
  }, [userId]);

  return (
    <div onMouseDown={(e) => e.stopPropagation()} className="detail">
      {text && <PopUp text={text} />}
      {movie && (
        <div className="detail-container" ref={detailRef}>
          <div className="close" onClick={onClose}>X</div>
          <div className="backdrop">
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" />
            <div className="icons">
              <div
                style={{ color: liked?.some((e) => e.id === movie.id) ? "red" : "" }}
                onClick={async () => {
                  await Like(movie, userId, setText);
                  if (setLiked && setWatchlist) await LikedItems(userId, setLiked, setWatchlist);
                }}
              >
                <FaHeart />
              </div>
              <div
                onClick={async () => {
                  await Watch_list(movie, userId, setText);
                  if (setLiked && setWatchlist) await LikedItems(userId, setLiked, setWatchlist);
                }}
              >
                {watchlist?.some((e) => e.id === movie.id) ? <FaMinus /> : <FaPlus />}
              </div>
            </div>
          </div>
          <div className="detail-texts">
            <div id="title">{movie.title}</div>
            <div className="detail-info">
              <p>{movie.vote_average}</p>
              <p>{new Date(movie.release_date).getFullYear()}</p>
              <p>{movie.runtime}m</p>
              <div id="genres">
                {movie.genres?.map((genre) => (
                  <Buttons key={genre.id} color="black" backgroundColor="white" text={genre.name} />
                ))}
              </div>
            </div>
            <p>{movie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
}
/*
{adult: false, backdrop_path: '/mplZTqxwomZrEV5XRMUgAALwLzU.jpg', belongs_to_collection: null, budget: 4100000, genres: Array(4), …}
adult
: 
false
backdrop_path
: 
"/mplZTqxwomZrEV5XRMUgAALwLzU.jpg"
belongs_to_collection
: 
null
budget
: 
4100000
genres
: 
(4) [{…}, {…}, {…}, {…}]
homepage
: 
"https://chainsawman.movie"
id
: 
1218925
imdb_id
: 
"tt30472557"
origin_country
: 
['JP']
original_language
: 
"ja"
original_title
: 
"チェンソーマン レゼ篇"
overview
: 
"In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji's world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules."
popularity
: 
98.1224
poster_path
: 
"/pHyxb2RV5wLlboAwm9ZJ9qTVEDw.jpg"
production_companies
: 
[{…}]
production_countries
: 
[{…}]
release_date
: 
"2025-09-19"
revenue
: 
168300000
runtime
: 
100
spoken_languages
: 
Array(1)
0
: 
{english_name: 'Japanese', iso_639_1: 'ja', name: '日本語'}
length
: 
1
[[Prototype]]
: 
Array(0)
status
: 
"Released"
tagline
: 
""
title
: 
"Chainsaw Man - The Movie: Reze Arc"
video
: 
false
vote_average
: 
7.8
vote_count
: 
242
[[Prototype]]
: 
Object
*/ 