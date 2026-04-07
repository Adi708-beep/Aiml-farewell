import { useEffect, useRef, useState } from 'react';
import { FaMusic, FaPause, FaPlay } from 'react-icons/fa';
import './BackgroundMusic.css';

const MUSIC_SOURCES = [
  '/agregpics-apocalipse-culture-476255.mp3',
  '/audio/background.mp3',
  '/background.mp3',
  '/music.mp3'
];

const MUSIC_PREF_KEY = 'bgm-enabled';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const sourceIndexRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let mounted = true;
    let removeInteractionListeners = null;
    let removeAudioListeners = null;

    const audio = new Audio(MUSIC_SOURCES[0]);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.35;
    audio.playsInline = true;
    audio.autoplay = true;
    audioRef.current = audio;

    const startPlayback = async (audio) => {
      try {
        audio.muted = false;
        await audio.play();
        return true;
      } catch {
        try {
          audio.muted = true;
          await audio.play();
          window.setTimeout(() => {
            audio.muted = false;
          }, 120);
          return true;
        } catch {
          audio.muted = false;
          return false;
        }
      }
    };

    const setup = async () => {
      if (!mounted) return;

      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onError = () => {
        const next = sourceIndexRef.current + 1;
        if (next >= MUSIC_SOURCES.length) return;
        sourceIndexRef.current = next;
        audio.src = MUSIC_SOURCES[next];
        audio.load();
        void startPlayback(audio);
      };

      audio.addEventListener('play', onPlay);
      audio.addEventListener('pause', onPause);
      audio.addEventListener('error', onError);

      removeAudioListeners = () => {
        audio.removeEventListener('play', onPlay);
        audio.removeEventListener('pause', onPause);
        audio.removeEventListener('error', onError);
      };

      const autoplayRequested = localStorage.getItem(MUSIC_PREF_KEY) !== 'off';
      const started = await startPlayback(audio);
      if (!mounted) return;

      if (!started && !autoplayRequested) {
        setIsPlaying(false);
      }

      if (!started) {
        const oneTapStart = async () => {
          const ok = await startPlayback(audio);
          if (ok && removeInteractionListeners) {
            removeInteractionListeners();
            removeInteractionListeners = null;
          }
        };

        const events = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
        events.forEach(evt => window.addEventListener(evt, oneTapStart, { passive: true }));
        removeInteractionListeners = () => {
          events.forEach(evt => window.removeEventListener(evt, oneTapStart));
        };
      }
    };

    void setup();

    return () => {
      mounted = false;
      if (removeInteractionListeners) removeInteractionListeners();
      if (removeAudioListeners) removeAudioListeners();
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        audio.muted = false;
        await audio.play();
        localStorage.setItem(MUSIC_PREF_KEY, 'on');
      } catch {
        try {
          audio.muted = true;
          await audio.play();
          window.setTimeout(() => {
            audio.muted = false;
          }, 120);
          localStorage.setItem(MUSIC_PREF_KEY, 'on');
        } catch {
          setIsPlaying(false);
        }
      }
      return;
    }

    audio.pause();
    localStorage.setItem(MUSIC_PREF_KEY, 'off');
  };

  return (
    <button
      type="button"
      className={`music-toggle ${isPlaying ? 'playing' : ''}`}
      onClick={togglePlayback}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      title={isPlaying ? 'Pause Music' : 'Play Music'}
    >
      <span className="music-pulse" aria-hidden="true" />
      <span className="music-icon-wrap" aria-hidden="true">
        <FaMusic className="music-note" />
      </span>
      <span className="music-state" aria-hidden="true">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </span>
    </button>
  );
};

export default BackgroundMusic;
