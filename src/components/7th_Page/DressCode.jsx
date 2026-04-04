import React from "react";
import "./DressCode.css";
import { FaTshirt, FaMask, FaUserAstronaut, FaHatCowboy, FaUserSecret } from "react-icons/fa";

const DressCode = () => {
  return (
    <div className="dress-wrapper">

      {/* HEADER */}
      <div className="dress-header">
        <h1>
          DRESS <span>CODE</span>
        </h1>
        <p>
          STEP BACK IN TIME. EMBRACE THE 80s NEON AND VINTAGE VIBES
          OF THE UPSIDE DOWN.
        </p>
      </div>

      {/* OPTIONS */}
      <div className="dress-options">
        <div className="dress-card">
          <FaUserSecret />
          <span>80s RETRO</span>
        </div>

        <div className="dress-card">
          <FaUserAstronaut />
          <span>NEON OUTFITS</span>
        </div>

        <div className="dress-card">
          <FaMask />
          <span>STRANGER THINGS COSPLAY</span>
        </div>

        <div className="dress-card">
          <FaHatCowboy />
          <span>VINTAGE DENIM</span>
        </div>

        <div className="dress-card center">
          <FaTshirt />
          <span>UPSIDE DOWN VIBES</span>
        </div>
      </div>

      {/* QUOTE */}
      <div className="dress-quote">
        "Wear whatever you like and what best suits you and you are comfortable with."
      </div>

    </div>
  );
};

export default DressCode;