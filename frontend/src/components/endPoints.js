export const Like=async(movie,userId,setText)=>{
 try{
    if(!userId){
        return alert("Log in first")
    }
const items ={title:movie.title || movie.name,id:movie.id, poster:movie.poster_path, media_type:movie.media_type}
const res = await fetch(`http://localhost:8000/api/liked/${userId}`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(items)
})
const data = await res.json()
if(!res.ok){
   return setText(data.message)
}
else{
  return  setText(data.message)
    
}
 }catch(error){
    console.log(error)
 }
}
export const LikedItems =async(userId,setLiked,setWatchlist)=>{
    try{
        if(!userId)return;
        const res = await fetch(`http://localhost:8000/api/${userId}`)
        const data = await res.json()
        if(!res.ok){
            return alert(data.message)
           
        }
        else{
            const movies = data.liked ?? []
            setLiked(movies)
            setWatchlist(data.watchList ?? [])
        }

    }catch(error){
    console.log(error)
 }
}
export const Watch_list=async(movie,userId,setText)=>{
 try{
    if(!userId){
        return alert("Log in first")
    }
const items ={title:movie.title || movie.name,id:movie.id, poster:movie.poster_path, media_type:movie.media_type}
const res = await fetch(`http://localhost:8000/api/watchlist/${userId}`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(items)
})
const data = await res.json()
if(!res.ok){
   return setText(data.message)
}
else{
  return  setText(data.message)
    
}
 }catch(error){
    console.log(error)
 }
}

export  const Next=(startIndex,setStartIndex,movies,visible)=>{
        if(startIndex + visible <movies.length){
            setStartIndex(startIndex + 1)
        }
    }
export  const Previous=(startIndex,setStartIndex)=>{
        if(startIndex >0){
            setStartIndex(startIndex-1)
        }
    }
export   const ShowDrop = (e) => {
  const drop = e.currentTarget.querySelector(".dropUp");
  drop.style.display = "flex";
};
export const HideDrop=(e)=>{
const drop = e.currentTarget.querySelector(".dropUp");
  drop.style.display = "none";
}