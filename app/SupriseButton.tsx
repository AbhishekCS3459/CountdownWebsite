'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SurpriseButtonProps {
  disabled: boolean; // Accept a disabled prop
}

const SurpriseButton: React.FC<SurpriseButtonProps> = ({ disabled }) => {
  const [showSurprise, setShowSurprise] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setShowSurprise(true);
      setTimeout(() => setShowSurprise(false), 3000); // Image will disappear after 3 seconds
    }
  };

  return (
    <div className="mt-8 z-10">
      <motion.button
        whileHover={!disabled ? { scale: 1.1, backgroundColor: '#F472B6' } : {}}
        whileTap={!disabled ? { scale: 0.9 } : {}}
        className={`bg-pink-400 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleClick}
        disabled={disabled}
      >
        {disabled ? 'Surprise Locked!' : 'Click for a Surprise!'}
      </motion.button>

      <AnimatePresence>
        {showSurprise && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }} // Smooth transition
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.img 
              src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/19172938/2022/8/3/fe6d10ea-4f9f-4419-886b-67ded31f02eb1659527936169TimexWomenSilver-TonedDialMulticolouredBraceletStyleAnalogue1.jpg" 
              alt="Surprise Gift"
              className="w-1/3 h-auto rounded-lg shadow-xl"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SurpriseButton;
