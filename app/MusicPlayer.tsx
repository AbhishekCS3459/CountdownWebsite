'use client'

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize the audio element
    audioRef.current = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/birthday-music-9zPAOGvrojpvfsPzwp9nNok5SKpWlI.mp3');
    audioRef.current.loop = true;

    // Attempt to play the audio
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay started successfully
          console.log("Music started playing.");
        })
        .catch((error) => {
          // Autoplay was prevented, set isPlaying to false
          console.log(error)
          setIsPlaying(false);
          console.log("Autoplay was prevented. User interaction is required to start the music.");
        });
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause(); // Pause the audio
        audioRef.current = null; // Clear the reference
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause the audio
      } else {
        audioRef.current.play(); // Play the audio
      }
      setIsPlaying(!isPlaying); // Toggle the playing state
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }} // Scale effect on hover
      whileTap={{ scale: 0.9 }} // Scale effect on tap
      className="fixed bottom-4 right-4 bg-purple-500 text-white p-3 rounded-full shadow-lg z-20"
      onClick={togglePlay} // Call togglePlay on click
    >
      {isPlaying ? '🔊' : '🔇'} {/* Show the play/pause icon */}
    </motion.button>
  );
};

export default MusicPlayer;
