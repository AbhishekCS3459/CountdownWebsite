import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('./birthday-music.mp3');
    audioRef.current.loop = true;
  }, []);

  const togglePlay = () => {

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 bg-purple-500 text-white p-3 rounded-full shadow-lg z-20"
      onClick={togglePlay}
    >
      {isPlaying ? '🔇' : '🔊'}
    </motion.button>
  );
};

export default MusicPlayer;
