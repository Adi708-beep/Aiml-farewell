import { useEffect, useRef, useState } from 'react';
import './MediaMosaic.css';

const MEDIA_ITEMS = [
  { id: 'v1', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20173910.mp4' },
  { id: 'v2', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20175141.mp4' },
  { id: 'v3', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20174624.mp4' },
  { id: 'v4', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20174738.mp4' },
  { id: 'v5', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20174936.mp4' },
  { id: 'v17', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20175852.mp4' },
  { id: 'v18', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20180031.mp4' },
  { id: 'v19', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20180207.mp4' },
  { id: 'v20', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20180326.mp4' },
  { id: 'v21', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20180440.mp4' },
  { id: 'v22', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20184124.mp4' },
  { id: 'v23', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20184245.mp4' },
  { id: 'v24', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20184514.mp4' },
  { id: 'v25', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20184628.mp4' },
  { id: 'v26', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20184755.mp4' },
  { id: 'i1', type: 'image', src: '/media/pic-01.jpg' },
  { id: 'v14', type: 'video', src: '/media/clip-14.mp4' },
  { id: 'v6', type: 'video', src: '/media/clip-06.mp4' },
  { id: 'v7', type: 'video', src: '/media/clip-07.mp4' },
  { id: 'i2', type: 'image', src: '/media/pic-02.jpg' },
  { id: 'v8', type: 'video', src: '/media/clip-08.mp4' },
  { id: 'v9', type: 'video', src: '/media/clip-09.mp4' },
  { id: 'i3', type: 'image', src: '/media/pic-03.jpg' },
  { id: 'v10', type: 'video', src: '/media/clip-10.mp4' },
  { id: 'v11', type: 'video', src: '/media/clip-11.mp4' },
  { id: 'i4', type: 'image', src: '/media/pic-04.jpg' },
  { id: 'v12', type: 'video', src: '/media/clip-12.mp4' },
  { id: 'v13', type: 'video', src: '/media/clip-13.mp4' },
  { id: 'i5', type: 'image', src: '/media/pic-05.jpg' },
  { id: 'v15', type: 'video', src: '/media/clip-15.mp4' },
  { id: 'v16', type: 'video', src: '/media/clip-16.mp4' }
];

const getVariant = (index) => (index % 7) + 1;

export default function MediaMosaic() {
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const [allowVideoMotion, setAllowVideoMotion] = useState(true);
  const [missingMap, setMissingMap] = useState({});

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
    const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    setAllowVideoMotion(!(coarsePointer || reduceMotion || lowMemory || lowCpu));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const playState = (isVisible) => {
      videoRefs.current.forEach(video => {
        if (!video) return;

        if (isVisible && allowVideoMotion) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      entries => {
        const isVisible = entries[0]?.isIntersecting ?? false;
        playState(isVisible);
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [allowVideoMotion]);

  const markMissing = (id) => {
    setMissingMap(prev => {
      if (prev[id]) return prev;
      return { ...prev, [id]: true };
    });
  };

  return (
    <section className="mosaic-section" ref={sectionRef}>
      <div className="mosaic-inner">
        <h2 className="mosaic-heading">AIML X STRANGERS THINGS</h2>
        <div className="mosaic-grid">
          {MEDIA_ITEMS.map((item, index) => {
            const variant = getVariant(index);
            const missing = !!missingMap[item.id];

            return (
              <article className={`mosaic-tile mosaic-variant-${variant}`} key={item.id}>
                {!missing && item.type === 'image' && (
                  <img
                    src={item.src}
                    alt="memory"
                    className="mosaic-media"
                    loading="lazy"
                    onError={() => markMissing(item.id)}
                  />
                )}

                {!missing && item.type === 'video' && (
                  <video
                    ref={el => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.src}
                    className="mosaic-media"
                    muted
                    playsInline
                    loop
                    autoPlay={allowVideoMotion}
                    preload="metadata"
                    onError={() => markMissing(item.id)}
                  />
                )}

                {missing && (
                  <div className="mosaic-fallback">
                    <span>{item.type === 'video' ? 'VIDEO SLOT' : 'IMAGE SLOT'}</span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
