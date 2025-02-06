import React, { useState } from "react";
import Particles from "react-tsparticles";
import { Link } from "react-router-dom";
// import Layout from "./Layout.js";
import "./home.css"; // Import your CSS file
import backgroundImage from "../assets/home-background-img.png"
import button from '../assets/icons8-right-chevron-50.png'

const Home = () => {
  const [particlesVisible, setParticlesVisible] = useState(true);

  const particlesOptions = {
    // Define your particles configuration here
  };

  return (
    <main className="main" style={{backgroundColor:"black", position:"absolute", justifyContent: "center", alignItems: "center"}}>
    
      {/* {particlesVisible && <Particles id="tsparticles" options={particlesOptions} />} */}
      <div className="container"style={{backgroundColor:"black"}}>
 
        <div style={{ display: "flex",  flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p className="title">FlexiPay</p>
          <p className="sub-title">Mobile recharge on the Go!</p>
          <Link to="/SignUp">
            <button className="get-started-btn">
              Get started
              <img className="get-started-img" src={button} alt="Right Chevron" />
            </button>
          </Link>
        </div>
        <div>
          <img src={backgroundImage} className="background-img" alt="Background" />
        </div>
      </div>
    </main>
  );
};

export default Home;
