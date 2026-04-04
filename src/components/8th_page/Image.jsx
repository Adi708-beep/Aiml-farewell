import React from "react";
import DomeGallery from "./DomeGallery";
import "./Image.css";

export default function Image() {
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
          fit={0.55}
          minRadius={500}
          maxRadius={1000}
          dragSensitivity={18}
          enlargeTransitionMs={350}
          segments={35}
          overlayBlurColor="#050505"
          openedImageWidth="260px"
          openedImageHeight="360px"
          imageBorderRadius="20px"
          openedImageBorderRadius="20px"
          grayscale={false}
        />
      </div>

    </div>
  );
}