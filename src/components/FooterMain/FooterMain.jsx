import "./FooterMain.css";
import { FaInstagram, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from "react-icons/fa";

export default function FooterMain() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id = "contact" className="footer-main">
      <div className="footer-glow footer-glow-1"></div>
      <div className="footer-glow footer-glow-2"></div>

      {/* 🔥 HEADING OUTSIDE CARD */}
      <h1 className="footer-heading">
        <span id = "hash">#</span>CREATE<span>MEMORIES</span>
      </h1>

      <div className="footer-box">

        <div className="footer-header">
          <p className="footer-tag">
            AIML × STRANGER THINGS
          </p>

          <button className="footer-top-btn" onClick={scrollTop}>
            <FaArrowUp />
          </button>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <h2>
              SEE YOU IN THE <span>UPSIDE DOWN</span>
            </h2>

            <p>
              One last night. One last memory. A farewell crafted in neon,
              nostalgia and chaos for the AIML batch of 2026.
            </p>
          </div>

          <div className="footer-links">
            <h3>MENU</h3>
            <a href="#event">EVENT</a>
            <a href="#segments">SPECIAL SEGMENTS</a>
            <a href="#organizers">ORGANIZERS</a>
            <a href="#volunteers">VOLUNTEERS</a>
          </div>

          <div className="footer-links">
            <h3>CONTACT</h3>
           <a
  href="https://www.instagram.com/aiml.stcet/"
  target="_blank"
  rel="noopener noreferrer"
  className="footer-contact-item"
>
  <FaInstagram />
  <span>@aiml_farewell</span>
</a>

            <div className="footer-contact-item">
              <FaEnvelope />
              <span>aimlfarewell@gmail.com</span>
            </div>

            <div className="footer-contact-item">
              <FaMapMarkerAlt />
              <span>STCET DIAS</span>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>FRIENDS DON'T LIE • CLASS OF 2026</p>
          <p>Designed for the final chapter.</p>
        </div>
      </div>
    </footer>
  );
}