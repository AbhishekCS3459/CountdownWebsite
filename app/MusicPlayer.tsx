'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/birthday-music-9zPAOGvrojpvfsPzwp9nNok5SKpWlI.mp3')
    audioRef.current.loop = true

    const playPromise = audioRef.current.play()

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Autoplay started successfully
      }).catch(error => {
        // Autoplay was prevented, set isPlaying to false
        setIsPlaying(false)
        console.log("Autoplay was prevented. User interaction is required to start the music.")
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 bg-purple-500 text-white p-3 rounded-full shadow-lg z-20"
      onClick={togglePlay}
    >
      {isPlaying ? '🔊' : '🔇'}
    </motion.button>
  )
}

export default MusicPlayer