import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/CardNav.css';

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  className = '',
  ease = 'power3.out',
  baseColor = '#3b0a0ab6',
  menuColor,
  buttonBgColor,
  buttonTextColor
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navRef = useRef(null);
  const itemsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 300;

    const contentEl = navEl.querySelector('.card-nav-content');
    if (contentEl) {
      return contentEl.scrollHeight + 80;
    }

    return 300;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(itemsRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(
      itemsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease,
        stagger: 0.08
      },
      '-=0.2'
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, []);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setItemRef = (i) => (el) => {
    if (el) itemsRef.current[i] = el;
  };

  const handleMenuItemClick = () => {
    if (!isExpanded) return;

    const tl = tlRef.current;
    setIsHamburgerOpen(false);

    if (!tl) {
      setIsExpanded(false);
      return;
    }

    tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
    tl.reverse();
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''}`}
        style={{ backgroundColor: baseColor }}
      >
        {/* TOP BAR */}
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            style={{ color: menuColor || '#000' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <a 
              href="https://www.instagram.com/aiml.stcet/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="logo-text"
            >
              AIML X STRANGER THINGS
            </a>
          </div>

          <button
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            #areyouready
          </button>
        </div>

        {/* MENU CONTENT */}
        <div className="card-nav-content">

          <a href="/#event" onClick={handleMenuItemClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div ref={setItemRef(0)} className="menu-item">
              EVENT <GoArrowUpRight />
            </div>
          </a>

          <a href="/#segment" onClick={handleMenuItemClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div ref={setItemRef(1)} className="menu-item">
              SPECIAL SEGMENTS <GoArrowUpRight />
            </div>
          </a>

          <Link to="/organizers" onClick={handleMenuItemClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div ref={setItemRef(2)} className="menu-item">
              ORGANIZERS <GoArrowUpRight />
            </div>
          </Link>

          <Link to="/volunteers" onClick={handleMenuItemClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div ref={setItemRef(3)} className="menu-item">
              VOLUNTEERS <GoArrowUpRight />
            </div>
          </Link>

          {/* CONTACT SECTION */}
          <div ref={setItemRef(5)} className="menu-item contact">
            <a href="/#contact" onClick={handleMenuItemClick} style={{ textDecoration: 'none', color: 'inherit' }}>
              CONTACT
            </a>
            <div className="contact-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="mailto:aimlfarewell@gmail.com">
                <FaEnvelope />
              </a>
            </div>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default CardNav;