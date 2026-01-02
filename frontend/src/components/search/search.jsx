import { useEffect, useRef, useState } from "react";
import "./search.css";
import { multiSearch } from "../../pages/movies/api/movie-api";
import { MoviesDetail } from "../../components/detail/moviesDetail";
import { SeriesDetail } from "../../components/detail/serieDetail";
export default function Search() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [itemId ,setItemId]=useState(null);
  const gridRef = useRef(null);

  const slicedResults = results.slice(0, 8);
  console.log(slicedResults.slice(0,1))
const selectedItem= results.find(e=> e.id === itemId)

  useEffect(() => {
    if (!text.trim()) {
      setResults([]);
      return;
    }

    const fetchSearch = async () => {
      const data = await multiSearch(text);

      // remove people
      const filtered = data.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
      );

      setResults(filtered);

    };

    fetchSearch();
  }, [text]);

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (itemId !== null) return;
      if (gridRef.current && !gridRef.current.contains(e.target)) {
        setText("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
{itemId !== null && selectedItem && (
  selectedItem.media_type === "movie" ? (
    <MoviesDetail
      id={itemId}
      onClose={() => setItemId(null)}
    />
  ) : (
    <SeriesDetail
      id={itemId}
      onClose={() => setItemId(null)}
    />
  )
)}
      <div className="search-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search movies or series..."
        />
      </div>

      {/* CONDITIONAL RENDER */}
      {text && results.length > 0 && (
        <div className="search-container">
          <div className="search-grid" ref={gridRef}>
            {slicedResults.map(item => (
              <div className="search-card" key={`${item.media_type}-${item.id}`} onClick={()=>setItemId(item.id)}>
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "/no-image.png"
                  }
                  alt={item.title || item.name}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}