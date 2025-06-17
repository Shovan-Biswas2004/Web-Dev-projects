import React,{useState} from 'react'

export default function TextForm(props) {
    const [text, setText] = useState("Enter the text here....");
    const handleUpClick = ()=>{
        let newText = text.toUpperCase()
         setText(newText)
    }
    const handleOnClick = (event)=>{
         console.log("You set the text")
         setText(event.target.value)
    }
  return (
    
      <div>
          <div className="mb-3">
              <label htmlFor="myBox" className="form-label fs-1 py-3">{props.heading}</label>
              <textarea className="form-control" id="myBox" rows="5" value={text} onChange={handleOnClick}></textarea>
          </div>
          <button className='btn btn-primary' onClick={handleUpClick}>Uppercase</button>
      </div>
  )
}
