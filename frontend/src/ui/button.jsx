import "./style.css"
export function Buttons({text,backgroundColor,onClick,color,fontSize}){
    
    return(
       <div className="uiButtons" style={{backgroundColor,color,fontSize}} onClick={onClick? onClick:null} >{text}</div>
    )
}
