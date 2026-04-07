import { useCallback, useEffect, useRef, useState } from 'react';
import './MediaMosaic.css';

const MEDIA_ITEMS = [
  { id: 'v1', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20173910.mp4' },
  { id: 'v2', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20175141.mp4' },
  { id: 'v3', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20174624.mp4' },
  { id: 'v4', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20174738.mp4' },
  { id: 'v5', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20174936.mp4' },
  { id: 'v6', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20175852.mp4' },
  { id: 'v7', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20180031.mp4' },
  { id: 'v8', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20180207.mp4' },
  { id: 'v9', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20180326.mp4' },
  { id: 'v10', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20180440.mp4' },
  { id: 'v11', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20184124.mp4' },
  { id: 'v12', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20184245.mp4' },
  { id: 'v13', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20184514.mp4' },
  { id: 'v14', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20184628.mp4' },
  { id: 'v15', type: 'video', src: '/video/Screen%20Recording%202026-04-07%20184755.mp4' }
];

const getVariant = (index) => (index % 7) + 1;

export default function MediaMosaic() {
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const tileRefs = useRef([]);
  const visibleVideoIndexesRef = useRef(new Set());
  const sectionVisibleRef = useRef(false);
  const lowPowerRef = useRef(false);
  const bgmPlayingRef = useRef(false);
  const syncRafRef = useRef(0);
  const startQueueRef = useRef(new Map());
  const [allowVideoMotion, setAllowVideoMotion] = useState(true);
  const [hiddenMap, setHiddenMap] = useState({});

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
    const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    lowPowerRef.current = lowMemory || lowCpu;
    setAllowVideoMotion(!reduceMotion);
  }, []);

  const clearStartQueue = useCallback(() => {
    startQueueRef.current.forEach(timeoutId => {
      window.clearTimeout(timeoutId);
    });
    startQueueRef.current.clear();
  }, []);

  const syncPlayback = useCallback(() => {
    const videos = videoRefs.current;

    const queuePlay = (video, index, delay) => {
      if (startQueueRef.current.has(index)) return;

      const timeoutId = window.setTimeout(() => {
        startQueueRef.current.delete(index);
        if (!video || !video.isConnected) return;

        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }, delay);

      startQueueRef.current.set(index, timeoutId);
    };

    if (!allowVideoMotion || !sectionVisibleRef.current) {
      clearStartQueue();
      videos.forEach(video => {
        if (!video) return;
        video.pause();
      });
      return;
    }

    const visibleIndexes = Array.from(visibleVideoIndexesRef.current)
      .sort((a, b) => a - b)
      .filter(index => !!videos[index]);
    const activeSet = new Set(visibleIndexes);
    const stagger = lowPowerRef.current ? 110 : bgmPlayingRef.current ? 80 : 28;

    videos.forEach((video, index) => {
      if (!video) return;

      if (activeSet.has(index)) {
        if (video.paused) {
          const position = visibleIndexes.indexOf(index);
          const delay = Math.max(0, position) * stagger;
          queuePlay(video, index, delay);
        }
      } else {
        const queuedStart = startQueueRef.current.get(index);
        if (queuedStart) {
          window.clearTimeout(queuedStart);
          startQueueRef.current.delete(index);
        }
        video.pause();
      }
    });
  }, [allowVideoMotion, clearStartQueue]);

  const scheduleSyncPlayback = useCallback(() => {
    if (syncRafRef.current) return;
    syncRafRef.current = requestAnimationFrame(() => {
      syncRafRef.current = 0;
      syncPlayback();
    });
  }, [syncPlayback]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionObserver = new IntersectionObserver(
      entries => {
        sectionVisibleRef.current = entries[0]?.isIntersecting ?? false;
        scheduleSyncPlayback();
      },
      { threshold: 0.08 }
    );

    const tileObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!Number.isFinite(index)) return;

          if (entry.isIntersecting) {
            visibleVideoIndexesRef.current.add(index);
          } else {
            visibleVideoIndexesRef.current.delete(index);
          }
        });

        scheduleSyncPlayback();
      },
      {
        threshold: 0.2,
        rootMargin: '80px 0px'
      }
    );

    const onVisibilityChange = () => {
      if (document.hidden) {
        clearStartQueue();
        videoRefs.current.forEach(video => video?.pause());
      } else {
        scheduleSyncPlayback();
      }
    };

    const onBgmState = (event) => {
      bgmPlayingRef.current = Boolean(event?.detail?.playing);
      scheduleSyncPlayback();
    };

    sectionObserver.observe(section);
    tileRefs.current.forEach(tile => {
      if (tile) tileObserver.observe(tile);
    });
    document.addEventListener('visibilitychange', onVisibilityChange, { passive: true });
    window.addEventListener('bgm:state', onBgmState);

    scheduleSyncPlayback();

    return () => {
      sectionObserver.disconnect();
      tileObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('bgm:state', onBgmState);
      clearStartQueue();
      if (syncRafRef.current) cancelAnimationFrame(syncRafRef.current);
    };
  }, [allowVideoMotion, scheduleSyncPlayback, clearStartQueue]);

  const hideBrokenTile = (id) => {
    setHiddenMap(prev => {
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
            const isHidden = !!hiddenMap[item.id];

            if (isHidden) return null;

            return (
              <article
                className={`mosaic-tile mosaic-variant-${variant}`}
                key={item.id}
                data-index={index}
                ref={el => {
                  tileRefs.current[index] = el;
                }}
              >
                {item.type === 'image' && (
                  <img
                    src={item.src}
                    alt="memory"
                    className="mosaic-media"
                    loading="lazy"
                    onError={() => hideBrokenTile(item.id)}
                  />
                )}

                {item.type === 'video' && (
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
                    onError={() => hideBrokenTile(item.id)}
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
