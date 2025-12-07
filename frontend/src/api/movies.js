const API_KEY= "f9b25f17ee8cc6371497d83826ce2a36"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWIyNWYxN2VlOGNjNjM3MTQ5N2Q4MzgyNmNlMmEzNiIsIm5iZiI6MTc2NTEyNjkwOC41ODgsInN1YiI6IjY5MzViMmZjMzExMTY0ZmU4ZmQxZmYwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6RKlOawYWmWkgaaaoVoX742edQG2pnCGedgrfg_C6AM"
const BASE_URL = "https://api.themoviedb.org/3";
export default async function getMovies(){
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;

}
export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
}
export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  return data.results; 
}