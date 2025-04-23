import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home.jsx"
//import About from "./Components/About/About";
//import SignUp from "./Components/Signup/SignUp";
import AuthProvider from "./Components/context/Auth/AuthProvider";
import MainPage from "./Components/MainPage/MainPage";
//import Movies from "./Components/Movies/Movies";
//import Trips from "./Components/Trips/Trips";
//import Events from "./Components/Events/Events";
//import Sports from "./Components/Sports/Sports";
//import SeatSelection from "./Components/Movies/SeatSelection";
//import OrderSummary from "./Components/Movies/OrderSummary";
//import ForgetPassword from "./Components/Login/ForgetPassword.jsx"
import CCProvider from "./Components/context/CinemaCart/CCProvider";
import Chatbot from "./Components/Chatbot/Chatbot";

function App() {
  return (
    <AuthProvider>
      <CCProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default Route */}
          <Route path="/home" element={<Home />} />
          <Route path="/mainpage" element={<MainPage />} />
           
         {/*   <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
         <Route path="/about" element={<About />} /> 
          
           <Route path="/Movies" element={<Movies />} />
          <Route path="/events" element={<Events />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/seats" element={<SeatSelection />}/>
          <Route path="/order-summary" element={<OrderSummary />} />  
          <Route path="/forget-password" element={<ForgetPassword />} />  */}
        </Routes>
        <Chatbot />
      </BrowserRouter>
      </CCProvider>
    </AuthProvider>
  );
}

export default App;