import './Hero.css';

const Hero = () => {
  return (
    <section id = "home"className="hero">

      <p className="hero-sub">
        STCET — AIML DEPARTMENT <br />
        <span>PROUDLY PRESENTS</span>
      </p>

      <h1 className="hero-title">
        THE LAST{" "}
        <span className="glow-text">
          <span>C</span>
          <span>R</span>
          <span>A</span>
          <span>W</span>
          <span>L</span>
        </span>
      </h1>

      <p className="hero-year">
        AIML FAREWELL <span>2026</span>
      </p>

      <div className="hero-tag">
        STRANGER THINGS THEME
      </div>

      <div className="hero-info">
        <div>
          <span>JUNE 2026</span>
          <span className="divider"> | </span>
          <span>1:30 PM ONWARDS</span>
        </div>

        <p className="hero-note">
          EXACT DATE WILL BE ANNOUNCED SOON
        </p>
      </div>

      <div className="scroll-text">
        SCROLL TO ENTER ↓
      </div>

    </section>
  );
};

export default Hero;