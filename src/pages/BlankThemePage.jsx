import EvilEye from '../components/EvilEye.jsx';
import Nav from '../components/Nav.jsx';
import './BlankThemePage.css';

const BlankThemePage = () => {
  return (
    <>
      <EvilEye />
      <Nav />
      <section className="blank-theme-page" aria-hidden="true" />
    </>
  );
};

export default BlankThemePage;
