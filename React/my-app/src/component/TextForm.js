import React,{useState} from 'react'

export default function TextForm(props) {
    const [text, setText] = useState("");
    const handleUpClick = ()=>{
        let newText = text.toUpperCase()
         setText(newText)
          props.showAlert("Converted to upperCase","success")
    }
    const handleDownClick = ()=>{
        let newText = text.toLowerCase()
         setText(newText)
         props.showAlert("Converted to lowerCase","success")
    }
    const handleOnClick = (event)=>{
        
         setText(event.target.value)
        
    }
  return (
    <>
      <div className='container' style={{color: props.mode === "dark"?"white":"black"}}>
          <div className="mb-3">
              <label htmlFor="myBox" className="form-label fs-1 py-3">{props.heading}</label>
              <textarea className="form-control" id="myBox" rows="5" value={text} onChange={handleOnClick}></textarea>
          </div>
          <button className='btn btn-primary' onClick={handleUpClick}>Uppercase</button>
          <button className='btn btn-primary mx-2' onClick={handleDownClick}>Lowercase</button>
      </div>
      <div className='container' style={{color: props.mode === "dark"?"white":"black"}}>
        <h1>Your text summary</h1>
        <h5>Words: {text.split(" ").filter((element)=>{return element.length!==0}).length} | Characters: {text.length}</h5>
      </div>
    </>  
  )
}
