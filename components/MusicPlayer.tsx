import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed)", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = new Audio("/music/song.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Intentar reproducir automáticamente
    const playAudio = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          // Si suena, quitamos el listener
          document.removeEventListener('click', playAudio);
        })
        .catch(error => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
    };

    playAudio();

    // Fallback: Si el autoplay falla, reproducir al primer clic
    document.addEventListener('click', playAudio);

    // Cleanup
    return () => {
      document.removeEventListener('click', playAudio);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <button
      onClick={togglePlay}
      className="fixed top-4 right-4 z-50 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all text-pink-600 border border-pink-200"
      aria-label="Toggle music"
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
};