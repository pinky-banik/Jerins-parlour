import { Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Error from "./Pages/Error";
import Review from "./Components/Dashboard.js/Review";
import BookingList from "./Components/Dashboard.js/BookingList";
import Book from "./Components/Dashboard.js/Book";
import Orderlist from "./Components/Dashboard.js/Orderlist";
import AddService from "./Components/Dashboard.js/AddService";
import AllUsers from "./Components/Dashboard.js/AllUsers";
import ManageServices from "./Components/Dashboard.js/ManageServices";
import Dashboard from './Pages/Dashboard';
import RequireAuth from './RequireAuth/RequireAuth';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>


        <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} >
          <Route index element={<Review/>}></Route>
          <Route path="review" element={<Review/>}></Route>
          <Route path="book" element={<Book/>}></Route>
          <Route path="bookingList" element={<BookingList/>}></Route>
          <Route path="orderList" element={<Orderlist/>}></Route>
          <Route path="addService" element={<AddService/>}></Route>
          <Route path="allUsers" element={<AllUsers/>}></Route>
          <Route path="manageService" element={<ManageServices/>}></Route>
        </Route>


        <Route path='*' element={<Error/>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
