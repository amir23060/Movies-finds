import { useEffect, useState } from "react";
import { HideDrop, Like, LikedItems, ShowDrop, Watch_list } from "../../components/endPoints";
import { FaAngleLeft, FaAngleRight, FaAngleUp, FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import "./watchlist.css"
import { MoviesDetail } from "../../components/detail/moviesDetail";
import { SeriesDetail } from "../../components/detail/serieDetail";
import { PopUp } from "../../components/popUp/popUp";
export function Liked(){
     const [movieId,setMovieId]=useState(null)
    const [liked,setLiked]=useState([])
     const [watchlist,setWatchlist]=useState([])
     const [text,setText]= useState("")
    const userId=localStorage.getItem("userId")
    useEffect(()=>{
        LikedItems(userId,setLiked,setWatchlist)
    },[])

    return(<div className="itemContainer">
        {text &&<PopUp text={text}/>}
        {movieId !==null?liked.find(e=> e.id === movieId).media_type==="movie"?<MoviesDetail id={movieId} onClose={() => setMovieId(null)} />:<SeriesDetail id={movieId} onClose={() => setMovieId(null)} />:null}
        <h1>Liked</h1>
        <div className="itemGrid">
            {liked?.map((movie)=>(
                <div className="itemCard" key={movie.id} onMouseEnter={e=>ShowDrop(e)} onMouseLeave={e=>HideDrop(e)}>
                     <img key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster}`}/>
                     <div className="dropUp" >
                                           <section> <div
                       style={{ color: liked.some(e => e.id === movie.id) ? "red" : "" }}
                       onClick={async () => {
                         await Like(movie, userId,setText);
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

    </div>)
}