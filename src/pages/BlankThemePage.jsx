import EvilEye from '../components/EvilEye.jsx';
import Nav from '../components/Nav.jsx';
import './BlankThemePage.css';

const BlankThemePage = () => {
  return (
    <>
      <EvilEye />
      <Nav />
      <section className="blank-theme-page" id="volunteers">
        <div className="blank-theme-content">
          <h1 className="blank-theme-title">VOLUNTEERS</h1>
          <p className="blank-theme-subtitle">Registrations for volunteers are now live!</p>
          <a
            className="blank-theme-button"
            href="https://forms.gle/2G7WRbKxiG8ozTCSA"
            target="_blank"
            rel="noopener noreferrer"
          >
            REGISTER NOW
          </a>
        </div>
      </section>
    </>
  );
};

export default BlankThemePage;
