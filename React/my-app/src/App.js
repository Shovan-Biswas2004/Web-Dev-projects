
import './App.css';
import Navbar from './component/Navbar';
import TextForm from './component/TextForm';
function App() {
  return (
    <>
     <Navbar title="Shovan"/>
     <div className='container'>
     <TextForm heading="Enter the text u wanna analyze"/>
     </div>
    </>
  );
}

export default App;
