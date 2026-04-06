import React, { useEffect, useState } from "react";
import DomeGallery from "./DomeGallery";
import "./Image.css";

export default function Image() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id = "gallery" className="image-page">
      
      {/* Optional Heading */}
      <div className="image-header">
        <h1 className="image-title">THIS IS NOT <span>THE LAST</span> </h1>
        <p className="image-subtitle">AIML 2026 Batch Moments</p>
      </div>

      {/* Gallery Section */}
      <div className="gallery-wrapper">
        <DomeGallery
          fit={isMobile ? 0.7 : 0.55}
          minRadius={isMobile ? 250 : 500}
          maxRadius={isMobile ? 680 : 1000}
          dragSensitivity={18}
          enlargeTransitionMs={350}
          segments={isMobile ? 28 : 35}
          overlayBlurColor="#050505"
          openedImageWidth={isMobile ? "72vw" : "260px"}
          openedImageHeight={isMobile ? "62vh" : "360px"}
          imageBorderRadius="20px"
          openedImageBorderRadius="20px"
          grayscale={false}
        />
      </div>

    </div>
  );
}