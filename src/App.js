import { Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Error from "./Pages/Error";
import BookingList from "./Components/Dashboard.js/BookingList";
import Book from "./Components/Dashboard.js/Book";
import Orderlist from "./Components/Dashboard.js/Orderlist";
import AddService from "./Components/Dashboard.js/AddService";
import AllUsers from "./Components/Dashboard.js/AllUsers";
import ManageServices from "./Components/Dashboard.js/ManageServices";
import Dashboard from './Pages/Dashboard';
import RequireAuth from './RequireAuth/RequireAuth';
import Messages from "./Components/Dashboard.js/Messages";
import AddReview from "./Components/Dashboard.js/AddReview";
import RequireAdmin from './RequireAuth/RequireAdmin';
import AllReview from "./Components/Dashboard.js/AllReview";
import Services from "./Pages/Services";
import ServiceDetails from "./Pages/ServiceDetails";
import MyHistory from "./Components/Dashboard.js/MyHistory";
import AllHistory from "./Components/Dashboard.js/AllHistory";


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/service' element={<Services/>}></Route>
        <Route path='/serviceDetails/:serviceId' element={<RequireAuth><ServiceDetails/></RequireAuth>}></Route>


        <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} >
          <Route index element={<AddReview/>}></Route>
          <Route path="review" element={<AddReview/>}></Route>
          <Route path="allReview" element={<RequireAdmin><AllReview/></RequireAdmin>}></Route>
          <Route path="book/:paymentId" element={<Book/>}></Route>
          <Route path="bookingList" element={<BookingList/>}></Route>
          <Route path="history" element={<MyHistory/>} />
          <Route path="message" element={<RequireAdmin><Messages/></RequireAdmin>}></Route>
          <Route path="orderList" element={<RequireAdmin><Orderlist/></RequireAdmin>}></Route>
          <Route path="addService" element={<RequireAdmin><AddService/></RequireAdmin>}></Route>
          <Route path="allUsers" element={<RequireAdmin><AllUsers/></RequireAdmin>}></Route>
          <Route path="manageService" element={<RequireAdmin><ManageServices/></RequireAdmin>}></Route>
        </Route>


        <Route path='*' element={<Error/>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
