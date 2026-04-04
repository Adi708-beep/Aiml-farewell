import "./Segment.css";

const Segment = () => {
  return (
    <div id = "segment" className="segment-page">

      {/* 🔥 HEADING */}
      <h1 className="segment-heading">
        YOU MUST<span> REGISTER</span> FOR THIS !
      </h1>

      {/* 🎬 CARDS */}
      <div className="segment-container">

        {/* 🎥 CARD 1 */}
        <div className="segment-card">
          <img
            className="card-video"
            src="https://media.licdn.com/dms/image/v2/D5622AQGQfr33Eb_VYA/feedshare-shrink_800/B56Z1Z9K3JHcAc-/0/1775330700984?e=1776902400&v=beta&t=5KxIFOxMSxQVmYtmuq2WyGn1WikhtvRvqsDN975QE5o"
            alt="The Ramp Walk"
          />

          <div className="video-overlay"></div>

          {/* 🔗 REGISTER LINK */}
          <a
            href="https://forms.gle/DzC8xCaxo67pXznW7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="register-btn">REGISTER</button>
          </a>

          <div className="segment-content">
            <h2>THE <span>RAMP WALK</span></h2>
            <p>All year students are eligible</p>
            <p2>Exciting gifts for winners</p2>
          </div>
        </div>

        {/* 🎥 CARD 2 */}
        <div className="segment-card">
          <img
            className="card-video"
            src="https://i.pinimg.com/1200x/02/4e/3d/024e3da3e546cbc5076320ecb90cac09.jpg"
            alt="The Spice Dance"
          />

          <div className="video-overlay"></div>

          {/* 🔗 REGISTER LINK */}
          <a
            href="https://forms.gle/saXaHtmobhLUByGr5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="register-btn">REGISTER</button>
          </a>

          <div className="segment-content">
            <h2>THE <span>SPICE DANCE</span></h2>
            <p>All year students are eligible</p>
            <p2>Exciting gifts for winners</p2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Segment;