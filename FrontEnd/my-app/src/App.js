
import './App.css';
import Home from './Home/Home.js';
import React, { useState, useEffect } from "react";
import Navbar from './NavBar.js';
import Signup from './SignUp/SignUp.js';
import StorageService from "./Storage.js";
import Login from './Login.js'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
   <div>
   
    <Router>
      <Navbar />
      <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    
   </div> 
  );
}

export default App;
