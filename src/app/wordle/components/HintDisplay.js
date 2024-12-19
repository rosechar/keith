// app/wordle/components/HintDisplay.js
'use client'
import { motion } from 'framer-motion'

export function HintDisplay({ hint, additionalHint, onRequestHint }) {
  return (
    <motion.div 
      className="mb-8 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-xl mb-4">{hint}</p>
      
      {!additionalHint && (
        <motion.button
          onClick={onRequestHint}
          className="text-sm text-purple-400 hover:text-purple-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Need another hint?
        </motion.button>
      )}

      {additionalHint && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-400 mt-2"
        >
          {additionalHint}
        </motion.p>
      )}
    </motion.div>
  )
}