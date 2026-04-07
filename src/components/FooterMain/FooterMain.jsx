import "./FooterMain.css";
import { FaInstagram, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FooterMain() {
  const email = "aimlfarewell@gmail.com";

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmailClick = (e) => {
    e.preventDefault();

    const ua = navigator.userAgent || "";
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

    if (isAndroid) {
      window.location.href = `intent://co?to=${encodeURIComponent(email)}#Intent;scheme=googlegmail;package=com.google.android.gm;end`;
      setTimeout(() => {
        window.location.href = `mailto:${email}`;
      }, 500);
      return;
    }

    if (isIOS) {
      window.location.href = `googlegmail:///co?to=${encodeURIComponent(email)}`;
      setTimeout(() => {
        window.location.href = `mailto:${email}`;
      }, 500);
      return;
    }

    window.open(gmailWebUrl, "_blank", "noopener,noreferrer");
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
           
            <Link to="/organizers">ORGANIZERS</Link>
            <Link to="/volunteers">VOLUNTEERS</Link>
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

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
              onClick={handleEmailClick}
              className="footer-contact-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
              <span>{email}</span>
            </a>

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