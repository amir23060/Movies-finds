import "./app.css"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Landing } from "./pages/landing"
import { MoviesDetail } from "./pages/moviesDetail"
export default function App(){
  return(<>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/:id" element={<MoviesDetail/>}/>
  </Routes>
  </BrowserRouter>
  </>)
}
