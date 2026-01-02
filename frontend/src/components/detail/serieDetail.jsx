import { useEffect, useRef, useState } from "react";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { Like, LikedItems, Watch_list } from "../endPoints";
import { PopUp } from "../popUp/popUp";
import "./detail.css";
import { getSerieDetails, getSimilarSeries } from "../../pages/tv/api/serie-api";
import { Buttons } from "../../ui/button";

export function SeriesDetail({ id, onClose, liked =[], setLiked, watchlist=[], setWatchlist }) {
  const [movie, setMovie] = useState(null);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");
  const detailRef = useRef(null);


  useEffect(() => {
    getSerieDetails(id).then(setMovie);
  }, [id]);

   useEffect(() => {
    // Only call if setters exist
    if (userId ) {
      LikedItems(userId, setLiked, setWatchlist);
    }
  }, [userId]);

  return (
    <div className="detail" onMouseDown={(e) => e.stopPropagation()}>
      {text && <PopUp text={text} />}
      {movie && (
        <div className="detail-container" ref={detailRef}>
          <div className="close" onClick={onClose}>X</div>
          <div className="backdrop">
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" />
            <div className="icons">
              <div
                style={{ color: liked.some((e) => e.id === movie.id) ? "red" : "" }}
                onClick={async () => {
                  await Like(movie, userId, setText);
                  await LikedItems(userId, setLiked, setWatchlist);
                }}
              >
                <FaHeart />
              </div>
              <div
                onClick={async () => {
                  await Watch_list(movie, userId, setText);
                  await LikedItems(userId, setLiked, setWatchlist);
                }}
              >
                {watchlist.some((e) => e.id === movie.id) ? <FaMinus /> : <FaPlus />}
              </div>
            </div>
          </div>
          <div className="detail-texts">
            <div id="title">{movie.name}</div>
            <div className="detail-info">
              <p>{movie.vote_average}</p>
              <p>{new Date(movie.first_air_date).getFullYear()}</p>
              <p>{movie.number_of_seasons} seasons</p>
              <div id="genres">
                {movie.genres?.map((genre) => (
                  <Buttons key={genre.id} color="white" backgroundColor="black" text={genre.name} fontSize="14px" />
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
{adult: false, backdrop_path: '/ckPbbcJOcL43mJBrROTMrtOBIYK.jpg', created_by: Array(1), episode_run_time: Array(0), first_air_date: '2025-12-05', …}
adult
: 
false
backdrop_path
: 
"/ckPbbcJOcL43mJBrROTMrtOBIYK.jpg"
created_by
: 
[{…}]
episode_run_time
: 
[]
first_air_date
: 
"2025-12-05"
genres
: 
(2) [{…}, {…}]
homepage
: 
"https://www.primevideo.com/detail/0SQQLA7KPWBPYLSTDH2QCW37OD"
id
: 
240459
in_production
: 
true
languages
: 
['en']
last_air_date
: 
"2025-12-05"
last_episode_to_air
: 
{id: 6553052, name: 'Forsaken', overview: 'Ashur navigates the treacherous waters of the Roma…te to the brutal life of a gladiator in training.', vote_average: 2.2, vote_count: 14, …}
name
: 
"Spartacus: House of Ashur"
networks
: 
[{…}]
next_episode_to_air
: 
{id: 6553053, name: 'Unworthy', overview: "Korris faces Ashur's wrath and must prove himself worthy.", vote_average: 0, vote_count: 0, …}
number_of_episodes
: 
10
number_of_seasons
: 
1
origin_country
: 
['US']
original_language
: 
"en"
original_name
: 
"Spartacus: House of Ashur"
overview
: 
"In a world where he survived the events of Spartacus (2010), Ashur clawed his way to power, owning the same ludus that once owned him. Allying with a fierce gladiatrix, Ashur ignites a new kind of spectacle that offends the elite."
popularity
: 
209.4743
poster_path
: 
"/vNByuzy60v31nmUVPMA8oAtneUK.jpg"
production_companies
: 
[{…}]
production_countries
: 
[{…}]
seasons
: 
[{…}]
spoken_languages
: 
[{…}]
status
: 
"Returning Series"
tagline
: 
""
type
: 
"Scripted"
vote_average
: 
5.8
vote_count
: 
58
*/