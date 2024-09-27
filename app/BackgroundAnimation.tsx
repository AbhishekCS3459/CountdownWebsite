'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const BackgroundAnimation = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const items = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <motion.div
          key={item}
          className="absolute"
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * windowSize.height],
            x: [null, Math.random() * windowSize.width],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {item % 3 === 0 ? (
            <span className="text-4xl">🎈</span>
          ) : item % 3 === 1 ? (
            <span className="text-4xl">✨</span>
          ) : (
            <span className="text-4xl">🌟</span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default BackgroundAnimation