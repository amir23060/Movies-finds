import { useState } from "react";
import { searchMovies } from "../api/movies";
import "./search.css"
import { useNavigate } from "react-router-dom";
export default function Search() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const slicedResults=results?.slice(0,6)
  const navigate=useNavigate()
  const handleSearch = async () => {
    const data = await searchMovies(text);
    setResults(data);
  };

  return (
    <div className="search-container">
     <div className="search-input"> <input 
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Search movie..."
      />
      <button onClick={handleSearch}>Search</button></div>

     <div className="search-grid">
         {slicedResults.map(movie => (
        <div className="search-card" key={movie.id} onClick={()=>navigate(`/${movie.id}`)}>
            <img  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  alt="" />
            <p>{movie.title}</p>
        </div>
      ))}
     </div>
    </div>
  );
}