import React from 'react'
import "./index.css"
import Nav from './components/Nav.jsx';
import EvilEye from './components/EvilEye.jsx';
import Hero from './components/hero/Hero.jsx';
import AlphabetWall from './components/AlphabetWall.jsx';
import TextPressure from './components/2nd_page/TextPressure.jsx';
import About from './components/3rd_page/About.jsx';
import Scratch from './components/4th_page/Scratch.jsx';
import MediaMosaic from './components/10th_page/MediaMosaic.jsx';
import ShinyText from './components/5th_page/ShinyText.jsx';
import Poster from './components/5th_page/Poster.jsx';
import Timeline from './components/6th_page/Timeline.jsx';
import DressCode from './components/7th_Page/DressCode.jsx';
import Footer from './components/Footer/Footer.jsx';
import FlowingMenu from './components/FloatingMenu/FlowingMenu.jsx';
import Float from './components/FloatingMenu/Float.jsx';
import FooterMain from './components/FooterMain/FooterMain.jsx';
import Image from './components/8th_page/Image.jsx';
import Segment from './components/9th_page/Segment.jsx';









const App = () => {
  return (
    <>
    <Hero />
    <EvilEye />
    <Nav />
    <TextPressure />
    <About />
    <AlphabetWall />
    <Scratch />
    <MediaMosaic />
    <Float />
   
  
    <Poster />
    <Timeline />
    <DressCode />
    <Segment />
    
   <Image />
    <FooterMain />
    <Footer />
    </>
   
  )
}

export default App