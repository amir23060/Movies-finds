import { useRef, useState,useEffect } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import { PopUp } from "../popUp/popUp";
export function Login({onClose,loggedin}){
    const [firstName,setFirstName]=useState("")
const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [login,setLogin]= useState(true)
const [text,setText]=useState("")
const loginRef=useRef()
const navigate=useNavigate()
const handleSubmitLogin=async(e)=>{
    try{
        e.preventDefault()
        const user = {email,password}
        const res = await fetch("http://localhost:8000/api/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        })
        const data = await res.json()
        if(res.ok){
            setText(data.message)
            localStorage.setItem("loggedin",true)
            localStorage.setItem("userId",data.user._id)
            navigate(`/${data.user._id}`)
            onClose()
            loggedin()
        }
        else{
           return setText(data.message)
        }

    }catch(error){
        console.error(error)
    }
}
const handleSubmit=async(e)=>{
    try{
        e.preventDefault()
        const user = {firstName,lastName,email,password}
        const res = await fetch("http://localhost:8000/api",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        })
        const data = await res.json()
        if(res.ok){
            setText(data.message)
            localStorage.setItem("loggedin",true)
            localStorage.setItem("userId",data.user._id)
            onClose()
            loggedin()
            navigate(`/${data.user._id}`)
        }
        else{
           return setText(data.message)
        }

    }catch(error){
        console.error(error)
    }
}
 useEffect(() => {
  function handleClickOutside(e) {
    if (loginRef.current && !loginRef.current.contains(e.target)) {
      onClose();
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
return(
<>
{text &&<PopUp text={text}/>}
{login?
<div className="login-container">
<div className="login-form" ref={loginRef}>
       <h1>Movie finder</h1>
    <form onSubmit={handleSubmitLogin}>
       
        <div className="email">
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}required/>
        </div>
        <div className="password">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}required />
        </div>
        <div className="login-buttons">
            <button type="submit">Create account</button>
            <p>Don't have a account?<span onClick={()=>setLogin(false)}>Create account</span></p>
        </div>
    </form>

</div>

</div>:<div className="register-container">
<div className="register-form" ref={loginRef}>
    <h1>Movie finder</h1>
    <form onSubmit={handleSubmit}>
        <div className="names">
            <div>
                <label>First name</label>
                <input type="text" value={firstName} onChange={e=> setFirstName(e.target.value)} required/>
            </div>
            <div>
                <label>Last name</label>
                <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} required/>
            </div>
        </div>
        <div className="email">
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="password">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/>
        </div>
        <div className="register-buttons">
            <button type="submit">Create account</button>
            <p>Already have a account?<span onClick={()=>setLogin(true)}>log in</span></p>
        </div>
    </form>

</div>

</div> }


</>
)
}
/*
<div className="register-container">
<div className="register-form">
    <form onSubmit={handleSubmit}>
        <div className="names">
            <div>
                <label>First name</label>
                <input type="text" value={firstName} onChange={e=> setFirstName(e.target.value)}/>
            </div>
            <div>
                <label>Last name</label>
                <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)}/>
            </div>
        </div>
        <div className="email">
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="password">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div className="register-buttons">
            <button type="submit">Create account</button>
            <p>Already have a account?<Link to={"#"}>log in</Link></p>
        </div>
    </form>

</div>

</div> */