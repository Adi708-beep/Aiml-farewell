import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import './AlphabetWall.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const LIGHT_COLORS = [
  'oklch(0.7 0.25 25)',
  'oklch(0.75 0.2 140)',
  'oklch(0.8 0.2 90)',
  'oklch(0.65 0.25 260)',
  'oklch(0.7 0.2 330)',
  'oklch(0.8 0.15 60)',
  'oklch(0.7 0.2 180)'
];

const messages = [
  'GOODBYE FRIENDS',
  'WILL YOU MISS US',
  'THE UPSIDE DOWN',
  'FRIENDS DONT LIE',
  'RUN',
  'FAREWELL 2026'
];

const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionDiv = motion.div;

export default function AlphabetWall() {
  const [activeLetters, setActiveLetters] = useState(new Set());
  const [currentMessage, setCurrentMessage] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isSpelling, setIsSpelling] = useState(true);

  const resetTimeoutRef = useRef(null);

  const lightColorMap = useMemo(() => {
    return ALPHABET.split('').reduce((acc, letter, i) => {
      acc[letter] = LIGHT_COLORS[i % LIGHT_COLORS.length];
      return acc;
    }, {});
  }, []);

  const spellMessage = useCallback(() => {
    const msg = messages[currentMessage].toUpperCase();

    if (charIndex < msg.length) {
      const char = msg[charIndex];
      if (char !== ' ') {
        setActiveLetters(prev => new Set([...prev, char]));
      }
      setCharIndex(prev => prev + 1);
      return;
    }

    if (!resetTimeoutRef.current) {
      resetTimeoutRef.current = window.setTimeout(() => {
        setActiveLetters(new Set());
        setCharIndex(0);
        setCurrentMessage(prev => (prev + 1) % messages.length);
        resetTimeoutRef.current = null;
      }, 2000);
      setIsSpelling(false);
    }
  }, [charIndex, currentMessage]);

  useEffect(() => {
    if (!isSpelling) {
      const timeout = window.setTimeout(() => setIsSpelling(true), 2500);
      return () => window.clearTimeout(timeout);
    }

    const interval = window.setInterval(spellMessage, 300);
    return () => window.clearInterval(interval);
  }, [isSpelling, spellMessage]);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="alphabet-wall-section">
      <div className="alphabet-wall-bg" />
      <div className="alphabet-wall-inner">
        <MotionH2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="alphabet-wall-title"
        >
          The Wall
        </MotionH2>

        <MotionP
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="alphabet-wall-subtitle"
        >
          Watch the lights. They&apos;re trying to tell you something...
        </MotionP>

        <div className="alphabet-wall-grid-wrap">
          <div className="alphabet-wall-grid">
            {ALPHABET.split('').map((letter, i) => {
              const isActive = activeLetters.has(letter);
              const color = lightColorMap[letter];

              return (
                <div key={letter} className="alphabet-wall-item">
                  <div
                    className="alphabet-wall-wire"
                    style={{
                      background: `linear-gradient(to bottom, oklch(0.3 0 0), ${color})`,
                      transform: `rotate(${(i % 3 - 1) * 8}deg)`
                    }}
                  />

                  <div
                    className="alphabet-wall-bulb"
                    style={{
                      backgroundColor: isActive ? color : 'oklch(0.2 0.02 0)',
                      boxShadow: isActive ? `0 0 8px ${color}, 0 0 20px ${color}, 0 0 40px ${color}` : 'none'
                    }}
                  />

                  <span
                    className="alphabet-wall-letter"
                    style={{
                      color: isActive ? color : 'oklch(0.35 0.02 0)',
                      textShadow: isActive ? `0 0 10px ${color}` : 'none'
                    }}
                  >
                    {letter}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <MotionDiv
          className="alphabet-wall-message-wrap"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="alphabet-wall-message">{messages[currentMessage]}</p>
        </MotionDiv>
      </div>
    </section>
  );
}
