import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import "./ScrambledText.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ScrambledText = ({
  radius = 150,
  duration = 1.2,
  speed = 0.6,
  scrambleChars = ".:",
  className = "",
  children
}) => {

  const rootRef = useRef(null);
  const charsRef = useRef([]);
  const movePointRef = useRef(null);
  const frameRef = useRef(0);
  const inViewRef = useRef(true);

  useEffect(() => {

    const split = SplitText.create(rootRef.current.querySelector("p"), {
      type: "chars",
      charsClass: "char"
    });

    charsRef.current = split.chars;

    charsRef.current.forEach(c => {
      gsap.set(c, {
        display: "inline-block",
        attr: { "data-content": c.innerHTML }
      });
    });

    const processMove = () => {
      frameRef.current = 0;
      if (!inViewRef.current || document.hidden) return;
      if (!movePointRef.current) return;

      const { x, y } = movePointRef.current;

      charsRef.current.forEach(c => {

        const { left, top, width, height } = c.getBoundingClientRect();

        const dx = x - (left + width / 2);
        const dy = y - (top + height / 2);

        const dist = Math.hypot(dx, dy);

        if (dist < radius) {

          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content,
              chars: scrambleChars,
              speed
            },
            ease: "none"
          });

        }

      });

    };

    const handleMove = e => {
      movePointRef.current = { x: e.clientX, y: e.clientY };
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(processMove);
      }
    };

    const el = rootRef.current;

    const observer = new IntersectionObserver(
      entries => {
        inViewRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0, rootMargin: '120px 0px' }
    );

    observer.observe(el);

    el.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      el.removeEventListener("pointermove", handleMove);
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      split.revert();
    };

  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`scramble-wrapper ${className}`}>
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;