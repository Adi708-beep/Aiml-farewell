import React from "react";
import "./Footer.css";
import LaserFlow from "./LaserFlow";

const animatedPart = "THE LAST ";
const staticPart = "CRAWL";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Laser Layer */}
      <div className="laser-layer">
        <LaserFlow
          dpr={1.5}
          color="#ff0000"
          fogIntensity={0.35}
          wispIntensity={3.5}
          flowSpeed={0.25}
          verticalSizing={10}
          horizontalSizing={2}
          flowStrength={0}
          wispSpeed={44.5}
        />
      </div>

      {/* Noise */}
      <div className="noise-layer"></div>

      {/* Content */}
      <div className="footer-content">

        <h1 className="crawl-text">
          
          {/* Animated PART */}
          {animatedPart.split("").map((char, i) => (
            <span 
              key={`a-${i}`} 
              className="flicker"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {char}
            </span>
          ))}

          {/* STATIC PART */}
          <span className="static-text">
            {staticPart}
          </span>

        </h1>

        <p className="footer-sub">
          THE NIGHT NEVER REALLY ENDS...
        </p>

      </div>

      {/* 🔥 NEW: Developer Link */}
      <a
        href="https://www.linkedin.com/in/aditya-saha-326162338/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BqiRz3ALdRV6us7ArmcupUw%3D%3D"
        target="_blank"
        rel="noopener noreferrer"
        className="developer-link"
      >
        MEET THE DEVELOPER
      </a>

    </footer>
  );
};

export default Footer;