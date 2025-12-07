import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/movies";
import { useEffect, useState } from "react";
export function MoviesDetail(){
    const {id}= useParams()
    const [movie,setMovies]= useState(null)
    useEffect(()=>{
        getMovieDetails(id).then(setMovies)

    },[])
    console.log(movie)
    return(<>
    {movie && <div>
        <p>{movie.title}</p>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
        </div>}
    </>)
}