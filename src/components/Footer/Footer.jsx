import React, { useEffect, useState } from "react";
import "./Footer.css";
import LaserFlow from "./LaserFlow";

const animatedPart = "THE LAST ";
const staticPart = "CRAWL";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className="footer">

      {/* Laser Layer */}
      <div className="laser-layer">
        <LaserFlow
          dpr={isMobile ? 1 : 1.5}
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
    

    </footer>
  );
};

export default Footer;