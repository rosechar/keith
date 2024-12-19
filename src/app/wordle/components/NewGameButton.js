// app/wordle/components/NewGameButton.js
'use client'
import { motion } from 'framer-motion'

export function NewGameButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 
                 rounded-lg text-white font-medium shadow-lg
                 hover:from-teal-600 hover:to-emerald-600 transition-all"
    >
      Play Another 
    </motion.button>
  )
}