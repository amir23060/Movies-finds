import { useState } from "react";
import { useEffect } from "react";
import "./popUp.css"
export function PopUp({text}){
const [message,setMessage]= useState(null)
    useEffect(()=>{
        setMessage(text)
       const timer = setTimeout(()=>{
setMessage(null)
        },3500)
        return ()=>clearTimeout(timer)
    },[text])
      if (!message) return null; 
    return(<>
    <div className="pop">
        {message}
    </div>
    </>)
}