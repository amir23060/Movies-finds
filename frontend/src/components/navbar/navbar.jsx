import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Login } from "../login/login";
import "./navbar.css"
import { Buttons } from "../../ui/button";
import Search from "../search/search";
import { Warning } from "../warning/warning";
export function Navbar({movies}){
    const navigate =useNavigate()
    const {userId}= useParams()
    const [show,setShow]=useState(false)
    const [showWarning,setShowWarning]=useState(false)
    const [isLoggedIn,setIsLoggedIn]=useState(false)
 useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedin") === "true");
  }, []);
  const handleWarningAnswer=(answer)=>{
    setShowWarning(false)
  if(answer ==="yes"){
      localStorage.removeItem("loggedin");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/")
  }
  return;


}
const login=()=>{
    setShow(true)
}
   
    return(
 <>
 {showWarning && <Warning onAnswer={handleWarningAnswer} text={"Log out?"}/>}
   {show && <Login onClose={()=>setShow(false)} loggedin={()=>setIsLoggedIn(true)} />}
        <div className="navbar-conatiner">
          
           
<div className="leftSide">
     <div className="logo">Movie<span>FINDER</span></div>
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
           {!isLoggedIn ? <Buttons color={"black"} backgroundColor={"white"} text={"log in"} onClick={login}></Buttons>:<Buttons color={"black"} backgroundColor={"white"} text={"log out"} onClick={()=>setShowWarning(true)}></Buttons>}
</div>
<div className="rightSide">
<Search/>
</div>
        </div>
 </>
    )
}