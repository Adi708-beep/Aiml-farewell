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
  const sectionVisibleRef = useRef(false);
  const queueRef = useRef(new Map());
  const retryTimersRef = useRef(new Map());
  const rafRef = useRef(0);
  const lowPowerRef = useRef(false);
  const [readyMap, setReadyMap] = useState({});

  const refreshSectionVisibility = useCallback(() => {
    const section = sectionRef.current;
    if (!section || document.hidden) {
      sectionVisibleRef.current = false;
      return;
    }

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    if (viewportHeight <= 0) {
      sectionVisibleRef.current = false;
      return;
    }

    const visiblePixels = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    const minVisiblePixels = Math.max(24, viewportHeight * 0.08);
    sectionVisibleRef.current = rect.bottom > 0 && rect.top < viewportHeight && visiblePixels >= minVisiblePixels;
  }, []);

  useEffect(() => {
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
    const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

    lowPowerRef.current = lowMemory || lowCpu;
  }, []);

  const clearQueue = useCallback(() => {
    queueRef.current.forEach(timeoutId => window.clearTimeout(timeoutId));
    queueRef.current.clear();

    retryTimersRef.current.forEach(timeoutId => window.clearTimeout(timeoutId));
    retryTimersRef.current.clear();
  }, []);

  const playVideo = useCallback((index, attempt = 0) => {
    const video = videoRefs.current[index];
    if (!video || !video.isConnected || video.error) return;

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        if (attempt >= 3) return;
        const retryId = window.setTimeout(() => {
          retryTimersRef.current.delete(index);
          if (!sectionVisibleRef.current || !visibleIndexesRef.current.has(index)) return;
          playVideo(index, attempt + 1);
        }, 220 + attempt * 120);

        const existingRetry = retryTimersRef.current.get(index);
        if (existingRetry) window.clearTimeout(existingRetry);
        retryTimersRef.current.set(index, retryId);
      });
    }
  }, []);

  const syncPlayback = useCallback(() => {
    refreshSectionVisibility();

    if (!sectionVisibleRef.current) {
      clearQueue();
      videoRefs.current.forEach(video => video?.pause());
      return;
    }

    const visible = Array.from(visibleIndexesRef.current).sort((a, b) => a - b);
    const fallbackVisible = [];
    if (visible.length === 0) {
      for (let i = 0; i < MEDIA_ITEMS.length; i += 1) {
        const tile = tileRefs.current[i];
        if (!tile) continue;
        const rect = tile.getBoundingClientRect();
        if (rect.bottom >= -120 && rect.top <= window.innerHeight + 120) {
          fallbackVisible.push(i);
        }
      }
    }

    const effectiveVisible = visible.length > 0 ? visible : fallbackVisible;
    const activeIndexes = effectiveVisible;

    const activeSet = new Set(activeIndexes);
    const stagger = lowPowerRef.current ? 90 : 30;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (activeSet.has(index)) {
        if (video.error) {
          return;
        }

        video.preload = 'metadata';
        if (video.readyState === 0) {
          video.load();
        }

        if (!video.paused || queueRef.current.has(index)) {
          return;
        }

        const position = activeIndexes.indexOf(index);
        const timeoutId = window.setTimeout(() => {
          queueRef.current.delete(index);
          const current = videoRefs.current[index];
          if (!current || !current.isConnected) return;

          playVideo(index);
        }, Math.max(0, position) * stagger);

        queueRef.current.set(index, timeoutId);
      } else {
        const queued = queueRef.current.get(index);
        if (queued) {
          window.clearTimeout(queued);
          queueRef.current.delete(index);
        }

        const retryId = retryTimersRef.current.get(index);
        if (retryId) {
          window.clearTimeout(retryId);
          retryTimersRef.current.delete(index);
        }

        video.pause();
      }
    });
  }, [clearQueue, playVideo, refreshSectionVisibility]);

  const scheduleSyncPlayback = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      syncPlayback();
    });
  }, [syncPlayback]);

  const handleVideoError = useCallback((event) => {
    const video = event.currentTarget;
    if (!video) return;

    const retries = Number(video.dataset.retryCount || '0');
    if (retries >= 2) return;

    video.dataset.retryCount = String(retries + 1);
    window.setTimeout(() => {
      if (!video.isConnected) return;
      video.load();
      scheduleSyncPlayback();
    }, 180);
  }, [scheduleSyncPlayback]);

  const markVideoReady = useCallback((id) => {
    setReadyMap(prev => {
      if (prev[id]) return prev;
      return { ...prev, [id]: true };
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const resumeTimers = new Set();

    const scheduleResumeWithRetries = () => {
      const delays = [0, 120, 320, 640];
      delays.forEach(delay => {
        const timerId = window.setTimeout(() => {
          resumeTimers.delete(timerId);
          scheduleSyncPlayback();
        }, delay);
        resumeTimers.add(timerId);
      });
    };

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
      { threshold: 0.01, rootMargin: '160px 0px' }
    );

    const onVisibilityChange = () => {
      if (document.hidden) {
        clearQueue();
        videoRefs.current.forEach(video => video?.pause());
      } else {
        scheduleResumeWithRetries();
      }
    };

    const onUserActivation = () => {
      scheduleSyncPlayback();
    };

    const onPageRestore = () => {
      scheduleResumeWithRetries();
    };

    const onPageHide = () => {
      clearQueue();
      videoRefs.current.forEach(video => video?.pause());
    };

    sectionObserver.observe(section);
    tileRefs.current.forEach(tile => {
      if (!tile) return;
      tileObserver.observe(tile);
    });
    document.addEventListener('visibilitychange', onVisibilityChange, { passive: true });
    window.addEventListener('pointerdown', onUserActivation, { passive: true });
    window.addEventListener('keydown', onUserActivation, { passive: true });
    window.addEventListener('focus', onPageRestore, { passive: true });
    window.addEventListener('pageshow', onPageRestore, { passive: true });
    window.addEventListener('resize', onPageRestore, { passive: true });
    window.addEventListener('online', onPageRestore);
    window.addEventListener('pagehide', onPageHide);

    scheduleResumeWithRetries();

    return () => {
      sectionObserver.disconnect();
      tileObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointerdown', onUserActivation);
      window.removeEventListener('keydown', onUserActivation);
      window.removeEventListener('focus', onPageRestore);
      window.removeEventListener('pageshow', onPageRestore);
      window.removeEventListener('resize', onPageRestore);
      window.removeEventListener('online', onPageRestore);
      window.removeEventListener('pagehide', onPageHide);
      resumeTimers.forEach(timerId => window.clearTimeout(timerId));
      resumeTimers.clear();
      clearQueue();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [clearQueue, scheduleSyncPlayback]);

  return (
    <section className="mosaic-section" ref={sectionRef}>
      <div className="mosaic-inner">
        <h2 className="mosaic-heading">AIML X STRANGERS THINGS</h2>
        <div className="mosaic-grid">
          {MEDIA_ITEMS.map((item, index) => {
            const isReady = !!readyMap[item.id];

            return (
              <article
                className={`mosaic-tile mosaic-variant-${getVariant(index)} ${isReady ? 'mosaic-tile-ready' : 'mosaic-tile-loading'}`}
                key={item.id}
                data-index={index}
                ref={el => {
                  tileRefs.current[index] = el;
                }}
              >
                <video
                  ref={el => {
                    videoRefs.current[index] = el;
                  }}
                  src={item.src}
                  className="mosaic-media"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="metadata"
                  onCanPlay={() => {
                    markVideoReady(item.id);
                    scheduleSyncPlayback();
                  }}
                  onPlaying={() => markVideoReady(item.id)}
                  onLoadedData={() => markVideoReady(item.id)}
                  onError={handleVideoError}
                />
                <div className="mosaic-loading-flash" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
