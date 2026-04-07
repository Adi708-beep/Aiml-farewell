import { useCallback, useEffect, useRef, useState } from 'react';
import './MediaMosaic.css';

const MEDIA_ITEMS = [
  { id: 'v1', src: '/video/Screen%20Recording%202026-04-07%20173910.mp4' },
  { id: 'v2', src: '/video/Screen%20Recording%202026-04-07%20175141.mp4' },
  { id: 'v3', src: '/video/Screen%20Recording%202026-04-07%20174624.mp4' },
  { id: 'v4', src: '/video/Screen%20Recording%202026-04-07%20174738.mp4' },
  { id: 'v5', src: '/video/Screen%20Recording%202026-04-07%20174936.mp4' },
  { id: 'v6', src: '/video/Screen%20Recording%202026-04-07%20175852.mp4' },
  { id: 'v7', src: '/video/Screen%20Recording%202026-04-07%20180031.mp4' },
  { id: 'v8', src: '/video/Screen%20Recording%202026-04-07%20180207.mp4' },
  { id: 'v9', src: '/video/Screen%20Recording%202026-04-07%20180326.mp4' },
  { id: 'v10', src: '/video/Screen%20Recording%202026-04-07%20180440.mp4' },
  { id: 'v11', src: '/video/Screen%20Recording%202026-04-07%20184124.mp4' },
  { id: 'v12', src: '/video/Screen%20Recording%202026-04-07%20184245.mp4' },
  { id: 'v13', src: '/video/Screen%20Recording%202026-04-07%20184514.mp4' },
  { id: 'v14', src: '/video/Screen%20Recording%202026-04-07%20184628.mp4' },
  { id: 'v15', src: '/video/Screen%20Recording%202026-04-07%20184755.mp4' }
];

const getVariant = (index) => (index % 7) + 1;

export default function MediaMosaic() {
  const sectionRef = useRef(null);
  const tileRefs = useRef([]);
  const videoRefs = useRef([]);
  const visibleIndexesRef = useRef(new Set());
  const loadedIndexesRef = useRef(new Set());
  const pendingLoadIndexesRef = useRef(new Set());
  const sectionVisibleRef = useRef(false);
  const queueRef = useRef(new Map());
  const rafRef = useRef(0);
  const lowPowerRef = useRef(false);

  const [allowVideoMotion, setAllowVideoMotion] = useState(true);
  const [hiddenMap, setHiddenMap] = useState({});

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
    const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

    lowPowerRef.current = lowMemory || lowCpu;
    setAllowVideoMotion(!reduceMotion);
  }, []);

  const clearQueue = useCallback(() => {
    queueRef.current.forEach(timeoutId => window.clearTimeout(timeoutId));
    queueRef.current.clear();
  }, []);

  const ensureVideoLoaded = useCallback((index) => {
    if (loadedIndexesRef.current.has(index)) return;

    const item = MEDIA_ITEMS[index];
    const video = videoRefs.current[index];
    if (!item || !video) {
      pendingLoadIndexesRef.current.add(index);
      return;
    }

    if (!video.getAttribute('src')) {
      video.setAttribute('src', item.src);
    }

    video.preload = 'metadata';
    video.load();
    loadedIndexesRef.current.add(index);
    pendingLoadIndexesRef.current.delete(index);
  }, []);

  const syncPlayback = useCallback(() => {
    if (!sectionVisibleRef.current || !allowVideoMotion) {
      clearQueue();
      videoRefs.current.forEach(video => video?.pause());
      return;
    }

    const visible = Array.from(visibleIndexesRef.current)
      .filter(index => !hiddenMap[MEDIA_ITEMS[index]?.id])
      .sort((a, b) => a - b);

    const activeSet = new Set(visible);
    const stagger = lowPowerRef.current ? 90 : 30;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (activeSet.has(index)) {
        ensureVideoLoaded(index);

        if (!video.paused || queueRef.current.has(index)) {
          return;
        }

        const position = visible.indexOf(index);
        const timeoutId = window.setTimeout(() => {
          queueRef.current.delete(index);
          const current = videoRefs.current[index];
          if (!current || !current.isConnected) return;

          const playPromise = current.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        }, Math.max(0, position) * stagger);

        queueRef.current.set(index, timeoutId);
      } else {
        const queued = queueRef.current.get(index);
        if (queued) {
          window.clearTimeout(queued);
          queueRef.current.delete(index);
        }
        video.pause();
      }
    });
  }, [allowVideoMotion, clearQueue, ensureVideoLoaded, hiddenMap]);

  const scheduleSyncPlayback = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
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
            visibleIndexesRef.current.add(index);
          } else {
            visibleIndexesRef.current.delete(index);
          }
        });
        scheduleSyncPlayback();
      },
      { threshold: 0.18, rootMargin: '120px 0px' }
    );

    const preloadObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute('data-index'));
          if (!Number.isFinite(index)) return;
          ensureVideoLoaded(index);
        });
      },
      { threshold: 0, rootMargin: '360px 0px' }
    );

    const onVisibilityChange = () => {
      if (document.hidden) {
        clearQueue();
        videoRefs.current.forEach(video => video?.pause());
      } else {
        scheduleSyncPlayback();
      }
    };

    sectionObserver.observe(section);
    tileRefs.current.forEach(tile => {
      if (!tile) return;
      tileObserver.observe(tile);
      preloadObserver.observe(tile);
    });
    document.addEventListener('visibilitychange', onVisibilityChange, { passive: true });

    scheduleSyncPlayback();

    return () => {
      sectionObserver.disconnect();
      tileObserver.disconnect();
      preloadObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      clearQueue();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [allowVideoMotion, clearQueue, ensureVideoLoaded, scheduleSyncPlayback]);

  const hideBrokenTile = useCallback((id, index) => {
    visibleIndexesRef.current.delete(index);

    const pending = queueRef.current.get(index);
    if (pending) {
      window.clearTimeout(pending);
      queueRef.current.delete(index);
    }

    const video = videoRefs.current[index];
    if (video) {
      video.pause();
    }

    setHiddenMap(prev => {
      if (prev[id]) return prev;
      return { ...prev, [id]: true };
    });
  }, []);

  return (
    <section className="mosaic-section" ref={sectionRef}>
      <div className="mosaic-inner">
        <h2 className="mosaic-heading">AIML X STRANGERS THINGS</h2>
        <div className="mosaic-grid">
          {MEDIA_ITEMS.map((item, index) => {
            const isHidden = !!hiddenMap[item.id];
            if (isHidden) return null;

            return (
              <article
                className={`mosaic-tile mosaic-variant-${getVariant(index)}`}
                key={item.id}
                data-index={index}
                ref={el => {
                  tileRefs.current[index] = el;
                }}
              >
                <video
                  ref={el => {
                    videoRefs.current[index] = el;
                    if (el && pendingLoadIndexesRef.current.has(index)) {
                      ensureVideoLoaded(index);
                    }
                  }}
                  data-src={item.src}
                  className="mosaic-media"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="none"
                  onCanPlay={scheduleSyncPlayback}
                  onError={() => hideBrokenTile(item.id, index)}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
