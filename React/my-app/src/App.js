
import './App.css';
import Navbar from './component/Navbar';
import TextForm from './component/TextForm';
import About from './component/About';
import React,{ useState } from 'react';
import Alert from './component/Alert';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



function App() {
   const [mode, setMode] = useState("light");
    const [alert, setAlert] = useState(null);

   const showAlert =(message,type)=>{
      setAlert({
        msg: message,
        typ: type
      })
      setTimeout(()=>{
        setAlert(null)
      }, 2000)
   } 

   const toggleMode = ()=>{
    if(mode === "dark"){
      setMode("light");
      document.body.style.backgroundColor = "white"
      showAlert("Light Mode is enabled","success")
    }
    else {
      setMode("dark")
       document.body.style.backgroundColor = "grey"
       showAlert("Dark Mode is enabled","success")
    }
   }
  return (
    <>
    <Router>
     <Navbar title="Shovan" mode={mode} toggleMode={toggleMode}/>
     <Alert alert={alert}/>
     <div className='container'>
       <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<TextForm heading="Enter the text u wanna analyze" mode={mode} showAlert={showAlert} />} />
        </Routes>

     
     </div>
    </Router>

    </>
  );
}

export default App;
