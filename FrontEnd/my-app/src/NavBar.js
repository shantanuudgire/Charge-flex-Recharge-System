import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StorageService from "./Storage.js";
import logo from './/assets/flexipay_logo.png'
import Home from "./Home/Home.js";

import { Link } from "react-router-dom";
import "./NavBar.css"; // Import your CSS file


function Navbar() {


    const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(StorageService.isCustomerLoggedIn());
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(StorageService.isAdminLoggedIn());
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleNavigation = () => {
        setIsAdminLoggedIn(StorageService.isAdminLoggedIn());
        setIsCustomerLoggedIn(StorageService.isCustomerLoggedIn());
      };
      
      window.addEventListener("popstate", handleNavigation);
      return () => window.removeEventListener("popstate", handleNavigation);
    }, []);
  
    const logout = () => {
      StorageService.logout();
      navigate("/home");
    };
     
    return (
      <div className="navbar-title">
        {!isAdminLoggedIn && !isCustomerLoggedIn && (
          <header className="custom-navbar">
            <div className="navbar-title">
              <img src={logo} className="logo" alt="FlexiPay Logo" />
             
           
            <a  to="/home" className="brand-text">FlexiPay</a>
            </div>
            <div className="nav-links">
              <Link className="nav-button" to="/SignUp">Sign Up</Link>
              <Link className="nav-button" to="/login">Login</Link>
              <Link className="nav-button" to="/home">Contact</Link>
            </div>
          </header>
        )}
  
        {isAdminLoggedIn && (
          <header className="main-header custom-navbar">
            <div className="navbar-title">
              <a to="/login">Welcome, Admin</a>
            </div>
            <div className="nav-links">
              <Link className="nav-button" to="/admin/dashboard">
                <img src="../assets/dashboard.png" alt="Dashboard" className="icon" />Dashboard
              </Link>
              <button className="nav-button" onClick={logout}>
                <img src="../assets/logout.png" alt="Logout" className="icon" />Logout
              </button>
            </div>
          </header>
        )}
  
        {isCustomerLoggedIn && (
          <header className="main-header custom-navbar">
            <div className="navbar-title">
              <h5>Welcome, User</h5>
            </div>
            <div className="nav-links">
              <Link className="nav-button" to="/customer/dashboard">
                <img src="../assets/dashboard.png" alt="Dashboard" className="icon" />Dashboard
              </Link>
              <button className="nav-button" onClick={logout}>
                <img src="../assets/logout.png" alt="Logout" className="icon" />Logout
              </button>
            </div>
          </header>
        )}
        
      </div>
    );
  };

  
  export default Navbar;