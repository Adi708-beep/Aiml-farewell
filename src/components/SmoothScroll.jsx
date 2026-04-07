import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
    const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    if (reduceMotion || coarsePointer || lowMemory || lowCpu) return;

    const lenis = new Lenis({
      duration: 0.95,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      infinite: false,
      normalizeWheel: true,
    });

    let rafId;
    let isRunning = false;

    const raf = (time) => {
      if (!isRunning) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    const start = () => {
      if (isRunning) return;
      isRunning = true;
      rafId = requestAnimationFrame(raf);
    };

    const stop = () => {
      if (!isRunning) return;
      isRunning = false;
      cancelAnimationFrame(rafId);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange, { passive: true });
    start();

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stop();
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
