import { useEffect, useState } from "react";
import "./daytrending.css"
export function Day_Trending({ api,detailPopUp:DetailPopUp }) {
  const [items, setItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemId,setItemId]= useState(null)

  // Fetch data once
  useEffect(() => {
    api("day").then(setItems);
  }, [api]);
const slicedItems= items.slice(0,10)
  // Auto-slide every 3 seconds
  useEffect(() => {
    if (slicedItems.length === 0) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => 
        prev + 1 < slicedItems.length ? prev + 1 : 0
      );
    }, 6000);

    return () => clearInterval(interval); // cleanup
  }, [slicedItems]);

 const currentItem = slicedItems[startIndex]

  return (

    
       
   <>
   {itemId !== null? <DetailPopUp id={itemId} onClose={()=>setItemId(null)}/>:null}
      {currentItem && 
      (

        <div className="trending" onClick={()=> setItemId(currentItem.id)}>
    <div className="trending-img-wrap">
        <img src={`https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`} />
        <div className="fade-left"></div>
        <div className="fade-bottom"></div>
    </div>

    <div className="trending-info">
         <p style={{color:"red"}}>{`# ${startIndex +1} Spotlight`}</p>
        <h2>{currentItem.title?currentItem.title:currentItem.name}</h2>
        <div className="info">
           
             <p>{String(currentItem.media_type).charAt(0).toUpperCase()+ currentItem.media_type.slice(1)}</p>
            <p>{Number(currentItem.vote_average).toFixed(1)}</p>
            <p>{new Date(currentItem.release_date?currentItem.release_date:currentItem.first_air_date).getFullYear()}</p>
        </div>
        <p>{currentItem.overview}</p>
    </div>
</div>
       
      )}
   </>
      
    
  )
}
/*

{adult: false, backdrop_path: '/vINfddqZKlEsOzDpDfnHrrEAaH1.jpg', id: 216985, name: 'Blood Coast', original_name: 'Pax Massilia', …}
adult
: 
false
backdrop_path
: 
"/vINfddqZKlEsOzDpDfnHrrEAaH1.jpg"
first_air_date
: 
"2023-12-06"
genre_ids
: 
(3) [10759, 80, 18]
id
: 
216985
media_type
: 
"tv"
name
: 
"Blood Coast"
origin_country
: 
['FR']
original_language
: 
"fr"
original_name
: 
"Pax Massilia"
overview
: 
"As a vicious drug dealer tries to overtake Marseille, a rogue police captain and his daredevil team welcome a new recruit with an agenda of her own."
popularity
: 
17.5173
poster_path
: 
"/pKvpiFL4pxrixwpHg77s9oQqfNl.jpg"
vote_average
: 
7.3
vote_count
: 
80 */
/*
{adult: false, backdrop_path: '/892AxldNlRCcBXHX5AqHyq1FUP1.jpg', id: 1033148, title: 'Die My Love', original_title: 'Die My Love', …}
adult
: 
false
backdrop_path
: 
"/892AxldNlRCcBXHX5AqHyq1FUP1.jpg"
genre_ids
: 
(2) [18, 53]
id
: 
1033148
media_type
: 
"movie"
original_language
: 
"en"
original_title
: 
"Die My Love"
overview
: 
"Grace and her partner Jackson move into an old country house. She pursues her dream of writing, and the couple welcome a baby soon after. However, with Jackson frequently absent, and the pressures of domestic life weighing on her, Grace begins to unravel, leaving a path of destruction in her wake."
popularity
: 
62.9935
poster_path
: 
"/kajpShbFhOdpl6yCrLezMrr9tB4.jpg"
release_date
: 
"2025-10-06"
title
: 
"Die My Love"
video
: 
false
vote_average
: 
6.9
vote_count
: 
94
*/