import getTrendingMovies, { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "./api/movie-api";
import { MoviesDetail } from "../../components/detail/moviesDetail";
import {  Slides } from "../../components/slides/slides";
import "../layout.css"
import { useNavigate } from "react-router-dom";
import { Day_Trending } from "../../components/dayTrending/dayTrending";
import { Navbar } from "../../components/navbar/navbar";
export function Movies(){
    const navigate= useNavigate()
    return(<div className="container">
        <Navbar movies={true}/>
    <Day_Trending api={getTrendingMovies} detailPopUp={MoviesDetail}/>
    <div className="movieSlides">
        <Slides header={"Trending movies"} api={getTrendingMovies} detailPopUp={MoviesDetail}/>
        <Slides header={"Popular movies"} api={getPopularMovies} detailPopUp={MoviesDetail}/>
        <Slides header={"Top rated movies"} api={getTopRatedMovies} detailPopUp={MoviesDetail}/>
        <Slides header={"Now playing"} api={getNowPlayingMovies} detailPopUp={MoviesDetail}/>
        <Slides header={"Up coming movies"} api={getUpcomingMovies} detailPopUp={MoviesDetail}/>
    </div>
    </div>)

}