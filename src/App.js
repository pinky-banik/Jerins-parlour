import { Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
