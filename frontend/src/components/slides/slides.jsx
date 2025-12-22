import { useEffect, useRef, useState } from "react";
import "./slides.css"
import { FaAngleLeft, FaAngleRight, FaAngleUp, FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { HideDrop, Like, LikedItems, Next, Previous, ShowDrop, Watch_list } from "../endPoints";
import { PopUp } from "../popUp/popUp";
export function Slides({header,api,detailPopUp:DetailPopUp}){
    const [movies,setMovies]=useState([])
    const [watchlist,setWatchlist]=useState([])
    const [liked,setLiked]= useState([])
    const [startIndex,setStartIndex]=useState(0)
    const [movieId,setMovieId]=useState(null)
    const userId = localStorage.getItem("userId")
    const [text,setText]=useState("")
    const visible=5
    useEffect(()=>{
        api("week").then(setMovies)
    },[api])
     const slicedMovies=movies.slice(startIndex,startIndex+visible)

useEffect(()=>{
const fetchLike=()=>{
     if (!userId) return;
    LikedItems(userId,setLiked)

}
fetchLike()
},[userId])
console.log(userId)
    return(<>
    {text &&<PopUp text={text}/>}
  {movieId !== null ? <DetailPopUp id={movieId} onClose={() => setMovieId(null)} /> : null}
    <div className="movies-container">
        <h1>{header}</h1>
    <div className="movies-slide"> 
        <FaAngleLeft className="icons" onClick={()=>Previous(startIndex,setStartIndex)}/>
         <div className="slides"> 
            {slicedMovies?.map((movie)=>(
                <div className="movie"  key={movie.id} onMouseEnter={e=>ShowDrop(e)} onMouseLeave={e=>HideDrop(e)}>
                    <img key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                    <div className="dropUp" >
                      <section> <div
  style={{ color: liked.some(e => e.id === movie.id) ? "red" : "" }}
  onClick={async () => {
    await Like(movie, userId ,setText);
    LikedItems(userId, setLiked,setWatchlist);
  }}
>
  <FaHeart/>
</div>
                       <div onClick={async()=>{
                        await Watch_list(movie,userId,setText)
                        LikedItems(userId,setLiked,setWatchlist)
                       }}>{watchlist.some(e=>e.id === movie.id)?<FaMinus/>:<FaPlus/>}</div></section>
                       <div onClick={()=>setMovieId(movie.id)}><FaAngleUp/></div>

                    </div>
                </div>
      ))}
         </div>
      <FaAngleRight className="icons" onClick={()=>Next(startIndex,setStartIndex,movies,visible)}/>
    </div>
       </div></>)
}