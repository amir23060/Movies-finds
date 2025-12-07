import { useEffect, useState } from "react";
import "./landing.css"
import getMovies from "../api/movies";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Search from "../components/search";

export function Landing(){
    const [movies,setMovies]=useState([])
    const [startIndex,setStartIndex]=useState(0)
    const navigate = useNavigate()
    const visible=5

    useEffect(()=>{
        getMovies().then(setMovies)
    },[])
        const slicedMovies=movies.slice(startIndex,startIndex+visible)
    const imageScaleIp=(e)=>{
        const img = e.target
        img.style.transform= "scale(1.4)"
        img.style.transition ="1s ease"
        const reset=()=>{
             img.style.transform= "scale(1)"
             document.removeEventListener("mouseup",reset)
        }
        document.addEventListener("mouseup",reset)
    }
    const next=()=>{
        if(startIndex + visible <movies.length){
            setStartIndex(startIndex + 1)
        }

    }
    const previous=()=>{
        if(startIndex >0){
            setStartIndex(startIndex-1)
        }
    }

    return(<>
    <Search></Search>
    <div className="movies-container">
        <h1>Trending movies</h1>
    <div className="movies-slide"> 
        <FaAngleLeft className="icons" onClick={previous}/>
         {slicedMovies?.map((movie)=>(
        <>
        <div className="movies-card" key={movie.id} onClick={()=> navigate(`/${movie.id}`)} >
       
       <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} onClick={imageScaleIp}/>
       <p>{movie.title}</p>
        </div>
        </>
      ))}
      <FaAngleRight className="icons" onClick={next}/>
    </div>
       </div></>)
}