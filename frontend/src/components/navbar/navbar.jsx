import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Login } from "../login/login";
import "./navbar.css"
import { Buttons } from "../../ui/button";
import Search from "../search/search";
export function Navbar({movies}){
    const navigate =useNavigate()
    const {userId}= useParams()
    const [show,setShow]=useState(false)
    const [isLoggedIn,setIsLoggedIn]=useState(false)
 useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedin") === "true");
  }, []);
  const logOut=()=>{
    localStorage.removeItem("loggedin");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/")

}
const login=()=>{
    setShow(true)
}
   
    return(
 <>
   {show && <Login onClose={()=>setShow(false)} loggedin={()=>setIsLoggedIn(true)} />}
        <div className="navbar-conatiner">
          
            <div>Logo</div>
<div className="leftSide">
                <div className="navLinks">
               <Link to={isLoggedIn?`/${userId}`:"/"} 
                style={{color:movies?"red":""}}
               >Movies</Link>
               <Link to={isLoggedIn?`/tv/${userId}`:"/tv"} 
                style={{color:!movies?"red":""}}
               >Series</Link>
                <Link to={"/watchlist"}>Watch-list</Link>
                <Link to={`/liked`}>Liked</Link>
            </div>
           {!isLoggedIn ? <Buttons color={"black"} backgroundColor={"white"} text={"log in"} onClick={login}></Buttons>:<Buttons color={"black"} backgroundColor={"white"} text={"log out"} onClick={logOut}></Buttons>}
</div>
<div className="rightSide">
<Search/>
</div>
        </div>
 </>
    )
}