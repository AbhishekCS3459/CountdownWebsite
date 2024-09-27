'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import CountdownTimer from './CountdownTimer'
import BackgroundAnimation from './BackgroundAnimation'

import MusicPlayer from './MusicPlayer'
import SurpriseButton from './SupriseButton'

export default function BirthdayCountdown() {
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (isTimeUp) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 10000) // Stop confetti after 10 seconds
    }
  }, [isTimeUp])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-purple-200 flex flex-col items-center justify-center overflow-hidden">
      <BackgroundAnimation />
      
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold text-pink-600 mb-8 text-center z-10"
      >
        {isTimeUp ? "Happy Birthday Riju!" : "Birthday Countdown"}
      </motion.h1>

      <CountdownTimer setIsTimeUp={setIsTimeUp} />

      <SurpriseButton />

      <MusicPlayer />

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={500}
              colors={['#FFC0CB', '#DDA0DD', '#E6E6FA', '#FFD700']}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}