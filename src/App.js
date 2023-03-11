import './App.css';
import {useState} from "react";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Alert from './components/Alert';
import { BrowserRouter as Router,Route,Routes} 
        from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/Signup';
import Profile from './components/Profile';



function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <>
    <Router>
        
        <Navbar></Navbar>
        <Alert alert={alert} />
        <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
          <Route exact path="/home" element={<Home showAlert={showAlert}/>}></Route>
          <Route exact path="/about" element={<About showAlert={showAlert}/>}></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}></Route>
          <Route exact path="/profile" element={<Profile/>}></Route>

        </Routes>
        </div>
        
    </Router> 
      
    </>
  );
}

export default App;
