import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Carousel from "../component/Carousel";
import AuthForm from "../component/AuthForm";
import "../styles.css";

const Home = () => {
  return (
    <div>
      <div className="container mt-5">
        <div className="row align-items-center flex-column-reverse flex-md-row">
          
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <Carousel />
          </div>
          

          <div className="col-12 col-md-6">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;