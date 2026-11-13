import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import StoryBook from './story/StoryBook.jsx';
import WeddingInvitation from './App.jsx';

const MUSIC_SRC = `${import.meta.env.BASE_URL}musica.m4a`;
const MUSIC_VOLUME = 0.7;

/**
 * Música de fondo de toda la invitación. Los navegadores solo permiten reproducir audio
 * después de un toque del usuario, por eso arranca con el botón "Abrir invitación".
 */
function useBackgroundMusic() {
  const audioRef = useRef(null);
  const fadeRef = useRef(0);
  const wantsMusic = useRef(false);
  const [playing, setPlaying] = useState(false);

  const fadeIn = (audio) => {
    cancelAnimationFrame(fadeRef.current);
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / 1500);
      audio.volume = MUSIC_VOLUME * progress;
      if (progress < 1) fadeRef.current = requestAnimationFrame(step);
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    wantsMusic.current = true;
    audio.volume = 0;
    audio
      .play()
      .then(() => fadeIn(audio))
      .catch(() => {
        wantsMusic.current = false;
        setPlaying(false);
      });
  };

  const pause = () => {
    wantsMusic.current = false;
    audioRef.current?.pause();
  };

  const toggle = () => (wantsMusic.current ? pause() : play());

  useEffect(() => {
    const audio = audioRef.current;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // Pausa si el invitado cambia de app o pestaña y reanuda al volver.
    const onVisibility = () => {
      if (document.hidden) audio.pause();
      else if (wantsMusic.current) audio.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(fadeRef.current);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const audioElement = <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />;
  return { audioElement, playing, play, toggle };
}

export function MusicToggle({ playing, onToggle, className = '' }) {
  return (
    <button
      type="button"
      className={`music-toggle ${className}`}
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Silenciar música' : 'Activar música'}
    >
      {playing ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
    </button>
  );
}

// Primero se cuenta la historia (libro animado) y después aparece la confirmación de asistencia.
export default function Root() {
  const [showStory, setShowStory] = useState(true);
  const music = useBackgroundMusic();

  return (
    <>
      {music.audioElement}
      {showStory ? (
        <StoryBook
          onOpen={music.play}
          music={<MusicToggle playing={music.playing} onToggle={music.toggle} />}
          onFinish={() => {
            setShowStory(false);
            window.scrollTo(0, 0);
          }}
        />
      ) : (
        <>
          <WeddingInvitation />
          <MusicToggle
            playing={music.playing}
            onToggle={music.toggle}
            className="fixed top-4 right-4 z-50"
          />
        </>
      )}
    </>
  );
}
