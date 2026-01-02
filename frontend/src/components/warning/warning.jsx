import "./warning.css"
export function Warning({text,onAnswer}){
return(<div className="warning">
{ <div className="warningOverlay"
 onMouseDown={(e) => e.stopPropagation()}
>
    <h1>{text}</h1>
    <div className="warningBtns">
        <div onClick={()=> onAnswer("yes")}>Yes</div>
        <div onClick={()=> onAnswer("no")}>No</div>
    </div>
    </div>}
</div>)
    

}