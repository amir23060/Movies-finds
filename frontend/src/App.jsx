import "./app.css"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import {  Movies } from "./pages/movies/movies"
import { Series } from "./pages/tv/serie"
import { Liked } from "./pages/watchlist/liked"
import { WatchList } from "./pages/watchlist/watchlist"
export default function App(){
  return(<>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Movies/>}/>
    <Route path="/tv" element={<Series/>}/>
    <Route path="/:userId" element={<Movies/>}/>
    <Route path="/tv/:userId" element={<Series/>}/>
    <Route path="/liked" element={<Liked/>}/>
    <Route path="/watchlist" element={<WatchList/>}/>
   
    
  </Routes>
  </BrowserRouter>
  </>)
}
