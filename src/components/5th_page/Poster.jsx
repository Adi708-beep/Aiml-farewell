import React, { useRef } from "react";
import "./Poster.css";
import ShinyText from "./ShinyText.jsx";

const Poster = () => {
  const cardRef = useRef(null);

  const posterImage =
    "https://media.licdn.com/dms/image/v2/D5622AQGcSfo1rzDlAA/feedshare-shrink_480/B56Z1Xpz92KwAk-/0/1775292072028?e=1776902400&v=beta&t=Qs1XbEgZEXNfNRoVrRW5-ycb82IiM_FNSKkQ5eVbvdk";

  // 🔥 SAME UI — only adding tilt logic
  const handleMove = (clientX, clientY) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * -8;
    const rotateY = ((x - midX) / midX) * 8;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
    `;

    const glare = card.querySelector(".glare");
    if (glare) {
      glare.style.background = `
        radial-gradient(circle at ${x}px ${y}px,
        rgba(255,255,255,0.2),
        transparent 60%)
      `;
    }
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div className="poster-wrapper">

      {/* ✅ EXACT SAME SHINY TEXT */}
      <div className="shiny-heading">
        <ShinyText text="THE LAST CRAWL" />
      </div>

      <div
        ref={cardRef}
        className="poster-card"
        style={{ backgroundImage: `url(${posterImage})` }}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onMouseLeave={resetTilt}
        onTouchMove={(e) =>
          handleMove(e.touches[0].clientX, e.touches[0].clientY)
        }
        onTouchEnd={resetTilt}
      >
        <div className="glare"></div>
        <div className="poster-overlay"></div>

        <div className="poster-content">

          <div className="poster-top">
            <span>STCET</span>
            <span>AIML DEPT</span>
          </div>

          <h1 className="poster-title">
            THE LAST <span>CRAWL</span>
          </h1>

          <p className="poster-sub">FAREWELL <span>2026</span></p>

          <p className="poster-date">JUNE 2026 — DATE TBA</p>

          <div className="poster-details">

            <div className="detail">
              <p className="label">DATE</p>
              <p>JUNE 2026</p>
            </div>

            <div className="detail">
              <p className="label">TIME</p>
              <p>1:30 PM</p>
            </div>

            <div className="detail">
              <p className="label">VENUE</p>
              <p>STCET DIAS</p>
            </div>

            <div className="detail">
              <p className="label">LOCATION</p>
              <p>STCET CAMPUS</p>
            </div>

          </div>

          <div className="poster-tags">
            <span>STRANGER THINGS</span>
            <span>CLASS OF 2026</span>
            <span>AIML DEPT</span>
            <span>STCET</span>
          </div>

          <p className="poster-footer">
            FRIENDS DON'T LIE — STCET.EDU
          </p>

        </div>
      </div>
    </div>
  );
};

export default Poster;